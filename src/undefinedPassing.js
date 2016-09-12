import logger from './log.js';
import {registerCapability} from './coterminous.js';
import walkObject from './walkObject.js';
import {checkType} from './checkType.js';
var log = logger("regexPassing");
var Capability = {
    "name":"undefinedPassing",
    "version":"0.0.1",
    "needsChannel":false,
    "onSerialize":function({Message, Cache})
    {
        walkObject(Message, checkType.bind(null, "undefined"), function(regex)
        {
            return {"$undefined":true};
        });
    },
    "onDeserialize":function({Message, Cache})
    {
        walkObject(Message, checkType.bind(null, {"$undefined":"boolean"}), function(r)
        {
            return {"__$replaceByUndefined":true};
        });
    }
}
registerCapability(Capability);

export default {};