import logger from './log.js';
import {registerCapability, getCapabilities, Coterminous} from './coterminous.js';
import {assertType} from './checkType.js';
var log = logger("Coterminus-handshaker");

registerCapability({
    "name":"handshaker",
    "version":"0.0.1",
    "onRegister":function(reference)
    {
            log.debug("running onRegister");
        reference.createInterface = function()
        {
            return new Coterminous_Interface();
        }
        
        reference.getInterface = function(transport)
        {
            
        }
        
        reference.assertTransport = function(transport)
        {
            assertType(transport, {send:"function",receive:"subscription",disconnect:"function",disconnected:"subscription"})
        }
    },
    "onCreateInterface":function(rpcInterface)
    {
        
    },
    "onConnect":function(transport)
    {
        
    },
    "onSend":function()
    {
        
    },
    "onReceive":function()
    {
        
    } 
});
        
class Coterminous_Interface
{
    constructor()
    {
        var capabilities = Coterminous.getCapabilities;
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