import * as cycle from './lib/cycle.js';
import logger from './log.js';
import {assertType} from './checkType.js';
var log = logger("Coterminous");

var capabilities = {};

class Coterminous
{

}
var singleton = new Coterminous();
export default singleton;

export function registerCapability(options)
{
    log.debug("registering capability", options)
    assertType(options, {
        name:"string",
        version: "string",
        
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
    var versions = capabilities[lname];
    if (!versions)
    {
        versions = capabilities[lname]={};
    }
    if (versions.hasOwnProperty(lversion))
    {
        throw new Error(`Duplicate Registration ${lname}:${lversion}`);
    }
    try
    {
        if(options.onRegister)
        {
            options.onRegister(singleton);
        }
        versions[lversion] = options;
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
    return capabilities;
}