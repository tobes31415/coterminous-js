import logger from './log.js';
import {registerCapability} from './coterminous.js';
var log = logger("SimpleMsg");

var Capability = {
    "name":"simpleMsg",
    "version":"0.0.1",
    "onConnect":function({Cache, Channel})
    {
        log.debug("onConnect");
        window.simpleMsg = function(Message)
        {
            Channel.send(Message);
        }
    },
    "onReceive":function({Cache, Channel, Interface, Message})
    {
        log.debug("onReceive", Message);
    },
    "onSerialize":function({Message})
    {
        log.debug("Serializing!");
        Message.foo = 123;
    }
}
registerCapability(Capability);

export default {};