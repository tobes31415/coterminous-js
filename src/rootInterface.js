import logger from './log.js';
import {registerCapability, getCapabilities} from './coterminous.js';
import {assertType} from './checkType.js';
var log = logger("Coterminus-rootInterface");

function tryThis(fnRef, ...args)
{
    try
    {
        fnRef.apply(null, ...args);
    }
    catch(err)
    {
        log.error(err);
    }
}

function getRemoteRoot(){}

var rootObject = Symbol("rootObject");

registerCapability({
    "name":"root",
    "version":"0.0.1",
    "onRegister":function({Coterminous})
    {
        log.debug("onRegister");
        Coterminous.connect = function(transport)
        {
            log.debug("Coterminous.connect");
            return Coterminous.createInterface().connect(transport).then(getRemoteRoot)
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
    "onConnect":function({Cache, Channel, Root, Interface})
    {
        log.debug("onConnect");
        Interface.getRoot = function()
        {
            log.debug("Interface.getRoot");
            return Channel.send("rq");
        }
    },
    "onReceive":function({Message})
    {
        log.debug("onReceive");
        return rootObject;
    }
});