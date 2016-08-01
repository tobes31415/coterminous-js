import logger from './log.js';
import {registerCapability, getCapabilities} from './coterminous.js';
import {assertType} from './checkType.js';
import getAllCaches from './cache.js';
import Subcription from './subscription.js';
import Channel from './channel.js';
var log = logger("Coterminus-handshaker");


var TransportsSymbol = Symbol("transports");
var channelsSymbol = Symbol("channels");


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

var HandshakerCapability = {
    "name":"handshaker",
    "version":"0.0.1",
    "onRegister":function({Coterminous, Cache})
    {
        Cache.App[TransportsSymbol] = new WeakMap();
        Coterminous.connectTransport = function(Transport)
        {
            return doHandshake({Coterminous,Transport, Cache});
        }       
    } 
};
registerCapability(HandshakerCapability);


function processMessage({Coterminous, Transport, Message})
{
    try{
        log.debug("Processing a non-handshaking message");
        var cid = Message.c;
        var channels = getAllCaches({Transport, Capability:HandshakerCapability}).Connection[channelsSymbol];
        var channel=channels[Message.c];
        var Capability = channel.Capability;
        if (Capability.onReceive)
        {
            Capability.onReceive({Message:Message.m, Channel:channel, Cache:getAllCaches({Coterminous, Transport, Capability})})
            return;                
        }
        throw new Error("Channel isn't registered here")
    }
    catch(err){log.error("Failed to process message",err);}
}



function doHandshake({Coterminous, Transport, Cache})
{
    assertType(Transport, 
    {
        send:"function",
        receive:"subscription",
        disconnect:"function",
        disconnected:"subscription"
    })
    
    if(Cache.App[TransportsSymbol].has(Transport))
    {
        throw new Error("Duplicate Connection Attempt");
    }
    Cache.App[TransportsSymbol].set(Transport, true);
    
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
            try
            {
                if (msg.c && msg.c !== 0){return;}
                log.debug("received a reply");
                Transport.receive.unsubscribe(processHandshakeMessage);
                Transport.receive.clear();
                Transport.receive.subscribe(function(Message){
                    processMessage({Coterminous, Transport, Message})
                });
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
                var TransportCache = getAllCaches({Transport, Capability:HandshakerCapability}).Connection;
                var channels = TransportCache[channelsSymbol]={};
                sorted.forEach(function(capability)
                {
                    if (capability.channel)
                    {
                        var channel = new Channel({Transport, LocalChannelId:capability.channel, RemoteChannelId:msg[capability.fname].c, Capability:capability});
                    
                        channels[capability.channel]=channel;
                    }
                    if (capability.onConnect)
                    {
                        tryThis(capability.onConnect, {Channel: channel, Cache:getAllCaches({Coterminous, Transport, Capability:capability})});
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
