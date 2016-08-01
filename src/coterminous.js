import * as cycle from './lib/cycle.js';
import logger from './log.js';
import {assertType} from './checkType.js';
import getAllCaches from './cache.js';
var log = logger("Coterminous");

var capabilities_map = {};
var channelCount = 1;

class Coterminous
{

}
var singleton = new Coterminous();
export default singleton;

export function registerCapability(Capability)
{
    assertType(Capability, {
        name:"string",
        version: "string",
        
        priority: "?number",
        
        onRegister: "?function",
        onDeregister: "?function",

        onConnect: "?function",
        onDisconnect: "?function",
        
        onSerialize: "?function",
        onDeserialize:"?function",
        
        needsChannel : "?boolean"
    });
    
    var lname = Capability.name.toLowerCase();
    var lversion = Capability.version.toLowerCase();
    lname = lname.replace(/:/g,"");
    lversion = lversion.replace(/:/g,"");
    var fname = lname+":"+lversion;
    if (capabilities_map.hasOwnProperty(lversion))
    {
        throw new Error(`Duplicate Registration ${lname}:${lversion}`);
    }
    Capability.name = lname;
    Capability.version = lversion;
    Capability.fname = fname;
    if (!Capability.priority){Capability.priority = 50;}
    if (Capability.priority < 1){Capability.priority=1;}
    if (Capability.priority > 100){Capability.priority=100;}
    
    if (Capability.needsChannel)
    {
        Capability.channel = channelCount++;
    }
    try
    {
        if(Capability.onRegister)
        {
            Capability.onRegister({Coterminous:singleton, Cache:getAllCaches({Coterminous:singleton, Capability})});
        }
        capabilities_map[fname] = Capability;
        log.debug(`Registered ${lname}:${lversion}`)
    }
    catch(err)
    {
        log.error(err);
        throw err;
    }
}

export function getCapabilities()
{
    return capabilities_map;
}