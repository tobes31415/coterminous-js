import logger from './log.js';
import {registerCapability} from './coterminous.js';
import walkObject from './walkObject.js';
import {checkType} from './checkType.js';
var log = logger("regexPassing");
var Capability = {
    "name":"regexPassing",
    "version":"0.0.1",
    "needsChannel":false,
    "onSerialize":function({Message, Cache})
    {
        walkObject(Message, checkType.bind(null, "regex"), function(regex)
        {
            return {"$regex":regex.source, "flags":regex.flags};
        });
    },
    "onDeserialize":function({Message, Cache})
    {
        walkObject(Message, checkType.bind(null, {"$regex":"string", "flags":"string"}), function(r)
        {
            return new RegExp(r.$regex, r.flags);
        });
    }
}
registerCapability(Capability);

export default {};