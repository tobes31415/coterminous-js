import * as cycle from './lib/cycle.js';
import logger from './log.js';
import {assertType} from './checkType.js';
var log = logger("Coterminous");

var capabilities_map = {};
var channelCount = 1;

class Coterminous
{

}
var singleton = new Coterminous();
export default singleton;

export function registerCapability(options)
{
    assertType(options, {
        name:"string",
        version: "string",
        
        priority: "?number",
        
        onRegister: "?function",
        onDeregister: "?function",
        
        onCreateInterface: "?function",
        onDisposeInterface: "?function",

        onConnect: "?function",
        onDisconnect: "?function",
        
        onSend: "?function",
        onReceive: "?function"
    });
    
    var lname = options.name.toLowerCase();
    var lversion = options.version.toLowerCase();
    lname = lname.replace(/:/g,"");
    lversion = lversion.replace(/:/g,"");
    var fname = lname+":"+lversion;
    if (capabilities_map.hasOwnProperty(lversion))
    {
        throw new Error(`Duplicate Registration ${lname}:${lversion}`);
    }
    options.name = lname;
    options.version = lversion;
    options.fname = fname;
    if (!options.priority){options.priority = 50;}
    if (options.priority < 1){options.priority=1;}
    if (options.priority > 100){options.priority=100;}
    
    if (options.onSend || options.onReceive)
    {
        options.channel = channelCount++;
    }
    try
    {
        if(options.onRegister)
        {
            options.onRegister({Coterminous:singleton});
        }
        capabilities_map[fname] = options;
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