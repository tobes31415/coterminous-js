import logger from './log.js';
import {registerCapability, getCapabilities} from './coterminous.js';
import {assertType} from './checkType.js';
import getAllCaches from './cache.js';
var log = logger("Coterminus-handshaker");

function tryThis(fnRef, ...args)
{
    try
    {
        fnRef(...args);
    }
    catch(err)
    {
        log.error(err);
    }
}

function compare(a,b)
{
    return a===b?0:(a<b?-1:1);
}

function createInterface({Coterminous})
{
    var rpcInterface = new Coterminous_Interface({Coterminous})
    var temp = getCapabilities()
    for(let name in temp)
    {
        var c = temp[name];
        if (c.onCreateInterface)
        {
            tryThis(c.onCreateInterface, {Cache:getAllCaches({Coterminous, Interface:rpcInterface, Capability:c}), Interface:rpcInterface});
        }
    }
    return rpcInterface;
}

function disposeInterface(Coterminous, rpcInterface)
{
    var temp = getCapabilities()
    for(let name in temp)
    {
        var c = temp[name];
        if (capability.onDisposeInterface)
        {
            tryThis(capability.onDisposeInterface, {Cache:getAllCaches({Coterminous, Interface:rpcInterface, Capability:c}), Interface:rpcInterface});
        }
    }
}

registerCapability({
    "name":"handshaker",
    "version":"0.0.1",
    "onRegister":function({Coterminous})
    {
        Coterminous.createInterface = function()
        {
            return createInterface({Coterminous});
        }       
    } 
});

var channelsSymbol = Symbol("channels");

function doHandshake({Coterminous, Interface, Transport})
{
    assertType(Transport, 
    {
        send:"function",
        receive:"subscription",
        disconnect:"function",
        disconnected:"subscription"
    })
    
    var result = new Promise(function(resolve, reject)
    {
        log.debug("handshake beginning");
        var capabilities = {};
        var temp = getCapabilities();
        for(let name in temp)
        {
            var capability = temp[name];
            var meta = {
            };
            if (capability.channel)
            {
                meta.c = capability.channel;
            }
            capabilities[name]=meta;
        }
        Transport.send(capabilities);
        var processHandshakeMessage = function(msg)
        {
            log.debug("received a reply");
            try
            {
                Transport.receive.unsubscribe(processHandshakeMessage);
                var mine = Object.keys(temp);
                var theirs = Object.keys(msg);
                var both = mine.filter(function(k){return theirs.indexOf(k)!=-1;});
                log.debug("mine", mine, "theirs", theirs, "both", both);
                var versionCheck = {};
                var selected = {};
                for(let name of both)
                {
                    var c = temp[name];
                    if (!versionCheck[c.name]){versionCheck[c.name] = "0.0.0";}
                    if (c.version > versionCheck[c.name])
                    {
                        versionCheck[c.name]=c.version;
                        selected[c.name]=c;
                    }
                }
                var sorted = [];
                for (var key in selected)
                {
                    sorted.push(selected[key]);
                }
                sorted.sort(function(c1,c2){return compare(c1.priority, c2.priority);});
                log.debug("The following capabilities have been selected", sorted);
                var channels = Interface[channelsSymbol]=new WeakMap();
                sorted.forEach(function(capability)
                {
                    var channel = new Channel({Interface, Transport, ChannelId:msg[capability.fname].c});
                    if (capability.channel)
                    {
                        
                        channels.set(capability, channel);
                    }
                    if (capability.onConnect)
                    {
                        tryThis(capability.onConnect, {Coterminous, Interface, Channel: channel, Cache:getAllCaches({Coterminous, Interface, Transport, Capability:capability})});
                    }
                });
                log.debug("handshaking complete");
                resolve();
            }
            catch(err)
            {reject(err);}
        }
        setTimeout(reject, 5000);
        Transport.receive.subscribe(processHandshakeMessage);
    });
    result.then(null, function(){
        try{Transport.disconnect();}
        catch(ignored){};
    });
    return result;
}

import logger from './log.js';

var channelLog = logger("Channels");
var InterfaceSymbol = Symbol("Interface");
var TransportSymbol = Symbol("Transport");
var ChannelIdSymbol = Symbol("ChannelId");
class Channel
{
    constructor({Interface, Transport, ChannelId}){
        this[InterfaceSymbol] = Interface;
        this[TransportSymbol] = Transport;
        this[ChannelIdSymbol] = ChannelId
    }
    
    //sends a message, using the full stack to serialize it, returns a promise
    send(msg){
        channelLog.debug("Sending ", msg, "on Channel ", this[ChannelIdSymbol]);
    }
    
    //sends a message, bypassing the stack, returns undefined
    sendDirect(msg){
        channelLog.debug("Sending ", msg, "on Channel ", this[ChannelIdSymbol], "Directly");
    }
}

var CoterminousSymbol = Symbol("Coterminous");
class Coterminous_Interface
{
    constructor(Coterminous)
    {
        this[CoterminousSymbol]= Coterminous;
    }
    
    connect(Transport)
    {
        return doHandshake({Coterminous:this[CoterminousSymbol],Interface:this, Transport});
    }
}

