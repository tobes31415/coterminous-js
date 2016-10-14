import logger from './log.js';
import getAllCaches from './cache.js';
import {registerCapability} from './coterminous.js';
import Deferred from './deferred.js'
import {registerDispose, dispose} from './manualDispose.js';
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
        Coterminous.connect = function(Transport)
        {
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
            Cache.App[rootObjectSymbol] = newObjRoot;
        }
    },
    "onConnect":function({Cache, Channel})
    {
        Cache.Connection[channelSymbol]=Channel;
    },
    "onReceive":function({Cache, Channel, Message})
    {
        if (Message.sendRoot)
        {
            Channel.send(Cache.App[rootObjectSymbol]);
        }
        else
        {
            Cache.Connection[remoteRootPromise].resolve(Message);
        }
    }
}

registerCapability(Capability);