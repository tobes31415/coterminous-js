import logger from './log.js';
import getAllCaches from './cache.js';
import {registerCapability} from './coterminous.js';
import Deferred from './deferred.js'
var log = logger("Coterminus-rootInterface");

var remoteRootPromise = Symbol("remoteRootPromise");
var rootObjectSymbol = Symbol("rootObjectSymbol");
var channelSymbol = Symbol("channel");
var Capability = {
    "name":"root",
    "version":"0.0.1",
    "onRegister":function({Coterminous})
    {
        log.debug("onRegister");
        Coterminous.connect = function(transport)
        {
            log.debug("Coterminous.connect");
            var Interface = Coterminous.createInterface();
            return Interface.connect(transport).then(function()
            {
                var Cache = getAllCaches({Interface, Capability});
                Cache.Interface[remoteRootPromise] = new Deferred();
                Cache.Interface[channelSymbol].send({"sendRoot":true});
                return Cache.Interface[remoteRootPromise].promise;
            })
        }
    },
    "onCreateInterface":function({Interface, Cache})
    {
        log.debug("onCreateInterface");
        Interface.root = function(newObjRoot)
        {
            log.debug("Interface.root", newObjRoot);
            Cache.Interface[rootObjectSymbol] = newObjRoot;
        }
    },
    "onConnect":function({Cache, Interface, Channel})
    {
        log.debug("onConnect");
        Cache.Interface[channelSymbol]=Channel;
        
    },
    "onReceive":function({Cache, Channel, Interface, Message})
    {
        log.debug("onReceive", Message);
        if (Message.sendRoot)
        {
            log.debug("Responding to root request")
            Channel.send(Cache.Interface[rootObjectSymbol]);
        }
        else
        {
            log.debug("Received a remote root ", Message)
            Cache.Interface[remoteRootPromise].resolve(Message);
        }
    }
}
registerCapability(Capability);