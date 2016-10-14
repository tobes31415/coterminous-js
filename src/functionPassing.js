import logger from './log.js';
import {registerCapability} from './coterminous.js';
import walkObject from './walkObject.js';
import {checkType} from './checkType.js';
import Deferred from './deferred.js';
import {dispose, registerDispose, registerDisposeChain, disposable} from './manualDispose.js';
import StrongMap from './strongMap.js';
var log = logger("functionPassing");

var fnRefIdCount = 1;
var Capability = {
    "name":"functionPassing",
    "version":"0.0.1",
    "needsChannel":true,
    "priority": 100,
    "onReceive":function({Cache, Channel, Interface, Message})
    {
        if (Message.invoke)
        {
            var fn = Cache.Connection.Local[Message.invoke];
            var sendResolve = function(...args){
                Channel.send({resolve:Message.respondTo, args:args});
            } 
            var sendReject = function(...args){
                Channel.send({reject:Message.respondTo, args:args});
            }
            try
            {  
                var result = fn(...Message.args);
                if (checkType("promise", result))
                {
                    result.then(sendResolve, sendReject);
                }
                else
                {
                    sendResolve(result);
                }
            }
            catch(err)
            {
                sendReject(err);
            }
        }
        else if (Message.resolve)
        {
            Cache.Connection.Responses[Message.resolve].resolve(... Message.args);
            delete Cache.Connection.Responses[Message.resolve];
        }
        else if (Message.reject)
        {
            Cache.Connection.Responses[Message.reject].reject(... Message.args);
            delete Cache.Connection.Responses[Message.reject];            
        }
        else if (Message.forget)
        {
            var fn = Cache.Connection.Remote[Message.forget];
            dispose(fn);
            delete Cache.Connection.Remote[Message.forget];
        }
    },
    "onConnect":function({Cache, Channel})
    {
        Cache.Connection.Local = {};
        Cache.Connection.LocalReverse = new StrongMap();
        registerDispose(Cache.Connection, function(){
            dispose(Cache.Connection.DisposeList);
            dispose(Cache.Connection.Remote);
            dispose(Cache.Connection.Channel);
            dispose(Cache.Connection.Responses);
        });

        Cache.Connection.DisposeList = [];
        Cache.Connection.Remote = {};
        Cache.Connection.Channel = Channel;
        Cache.Connection.Responses = {};
    },
    "onSerialize":function({Message, Cache})
    {
        walkObject(Message, checkType.bind(null, "function"), function(fn)
        {
            var id;
            if (!Cache.Connection.LocalReverse.has(fn))
            {
                id = fnRefIdCount++;
                Cache.Connection.LocalReverse.set(fn,id);
                Cache.Connection.Local[id]=disposable(fn);
                var token = {};
                registerDispose(token, disposeProxy.bind(null, Cache, id));
                Cache.Connection.DisposeList.push(token);
                
                //if the function itself is ever disposed we want to trigger the dispose action on each transport it's used in
                registerDisposeChain(fn, token);
            }
            else
            {
                id = Cache.Connection.LocalReverse.get(fn)
            }
            return {"$fnRef":id};
        });
    },
    "onDeserialize":function({Message, Cache})
    {
        walkObject(Message, checkType.bind(null, {"$fnRef":"number"}), function(fn)
        {
            if(!Cache.Connection.Remote[fn.$fnRef])
            {
                Cache.Connection.Remote[fn.$fnRef] = disposable(remoteProxy.bind(null, Cache, fn.$fnRef));
            }
            return Cache.Connection.Remote[fn.$fnRef];
        });
    }
}
registerCapability(Capability);
var responseIdCount = 1;
function remoteProxy(Cache, fnRef, ...args)
{
    var responseId = responseIdCount++;
    var result = Cache.Connection.Responses[responseId] = new Deferred();
    Cache.Connection.Channel.send({invoke:fnRef, args:args, respondTo:responseId});
    return result.promise;
}
function disposeProxy(Cache, fnRef)
{
    Cache.Connection.Channel.send({forget:fnRef});
    try{Cache.Connection.LocalReverse.delete(Cache.Connection.Local[fnRef]);}catch(ignored){}
    delete Cache.Connection.Local[fnRef];
}

export default {};