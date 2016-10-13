import once from './once.js';
import {checkType, assertType} from './checkType.js';
import logger from './log.js';
var log = logger("manualDispose");

var disposeSymbol = Symbol("dispose");

export function register(obj, cb)
{
    if (!checkType("object", obj) && !checkType("function", obj)){throw new Error("register dispose requires an object or a function");}
    if (!checkType("function", cb)){throw new Error("cb must be a function");}
    if (obj[disposeSymbol]){throw new Error("There is already a dispose handler registered for this object")}
    
    obj[disposeSymbol] = once(cb);
}

export function dispose(obj)
{
    if (obj[disposeSymbol])
    {
        try
        {
            obj[disposeSymbol]();
        }
        catch(error)
        {
            log.error(error);
        }
    }
    else if (typeof obj === "object")
    {        
        for(var key in obj)
        {
            dispose(obj[key]);
        }
    }
}