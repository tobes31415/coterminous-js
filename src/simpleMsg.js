import logger from './log.js';
import {registerCapability} from './coterminous.js';
var log = logger("SimpleMsg");

var Capability = {
    "name":"simpleMsg",
    "version":"0.0.1",
    "onConnect":function({Cache, Interface, Channel})
    {
        log.debug("onConnect");
        Cache.Interface.simpleMsg = function(Message)
        {
            Channel.send(Message);
        }
    },
    "onReceive":function({Cache, Channel, Interface, Message})
    {
        log.debug("onReceive", Message);
    }
}
registerCapability(Capability);