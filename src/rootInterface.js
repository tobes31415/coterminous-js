import logger from './log.js';
import getAllCaches from './cache.js';
import {registerCapability} from './coterminous.js';
var log = logger("Coterminus-rootInterface");

var rootObject = Symbol("rootObject");
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
                return Cache.Interface[channelSymbol].send({"sendRoot":true});
            })
        }
    },
    "onCreateInterface":function({Interface, Cache})
    {
        log.debug("onCreateInterface");
        Interface.root = function(newObjRoot)
        {
            log.debug("Interface.root", newObjRoot);
            Cache.Interface[rootObject] = newObjRoot;
        }
    },
    "onConnect":function({Cache, Interface, Channel})
    {
        log.debug("onConnect");
        Cache.Interface[channelSymbol]=Channel;
        
    },
    "onReceive":function({Channel, Message})
    {
        log.debug("onReceive", Message);
        if (Message.sendRoot)
        {
            log.debug("Responding to root request")
            Channel.send(rootObject);
        }
        else
        {
            log.debug("Received a remote root ", Message)
        }
    }
}
registerCapability(Capability);