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
    "needsChannel":true,
    "onRegister":function({Coterminous, Cache})
    {
        log.debug("onRegister");
        Coterminous.connect = function(Transport)
        {
            log.debug("Coterminous.connect");
            return Coterminous.connectTransport(Transport).then(function()
            {
                var Cache = getAllCaches({Transport, Capability});
                Cache.Connection[remoteRootPromise] = new Deferred();
                Cache.Connection[channelSymbol].send({"sendRoot":true});
                return Cache.Connection[remoteRootPromise].promise;
            })
        }
        Coterminous.root = function(newObjRoot)
        {
            log.debug("Coterminous.root", newObjRoot);
            Cache.App[rootObjectSymbol] = newObjRoot;
        }
    },
    "onConnect":function({Cache, Channel})
    {
        log.debug("onConnect");
        Cache.Connection[channelSymbol]=Channel;
    },
    "onReceive":function({Cache, Channel, Message})
    {
        log.debug("onReceive", Message);
        if (Message.sendRoot)
        {
            log.debug("Responding to root request")
            Channel.send(Cache.App[rootObjectSymbol]);
        }
        else
        {
            log.debug("Received a remote root ", Message)
            Cache.Connection[remoteRootPromise].resolve(Message);
        }
    }
}
registerCapability(Capability);