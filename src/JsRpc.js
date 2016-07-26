import * as cycle from './lib/cycle.js';
import logger from './log.js';
import {assertType} from './checkType.js';
var log = logger("JsRpc");

var capabilities = {};

class JsRpc
{
    registerCapability(options)
    {
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
                options.onRegister();
            }
            versions[lversion] = options;
            log.trace(`Registered ${lname}:${lversion}`)
        }
        catch(err)
        {
            log.error(err);
            throw err;
        }
    }
    
    createInterface()
    {
        return new JsRpc_Interface();
    }
}
var singleton = new JsRpc();


class JsRpc_Interface
{
    constructor()
    {
        for(let versions of capabilities)
        {
            var sortedVersions = [];
            for(version in versions){sortedVersions.push(version);}
            sortedVersions.sort().reverse();
            for(let version of sortedVersions)
            {
                var options = versions[version];
                if (options.onCreateInterface)
                {
                    options.onCreateInterface();
                }
            }
        }
    }
}

export default singleton;