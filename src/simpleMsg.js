import logger from './log.js';
import {registerCapability} from './coterminous.js';
var log = logger("SimpleMsg");

var Capability = {
    "name":"simpleMsg",
    "version":"0.0.1",
    "needsChannel":true,
    "onConnect":function({Cache, Channel})
    {
        window.simpleMsg = function(Message)
        {
            Channel.send({m:Message});
        }
    },
    "onReceive":function({Cache, Channel, Interface, Message})
    {
        log.debug("onReceive", Message.m);
        window.simpleMsgLast = Message.m;
    }
}
registerCapability(Capability);

export default {};