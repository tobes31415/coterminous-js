import logger from './log.js';
import {registerCapability} from './coterminous.js';
import walkObject from './walkObject.js';
import {checkTypeCurryable} from './checkType.js';
var log = logger("datePassing");
var Capability = {
    "name":"datePassing",
    "version":"0.0.1",
    "needsChannel":false,
    "onSerialize":function({Message, Cache})
    {
        walkObject(Message, checkTypeCurryable.bind(null, "date"), function(date)
        {
            return {"$date":date.getTime()};
        });
    },
    "onDeserialize":function({Message, Cache})
    {
        walkObject(Message, checkTypeCurryable.bind(null, {"$date":"number"}), function(d)
        {
            return new Date(d.$date);
        });
    }
}
registerCapability(Capability);

export default {};