import once from './once.js';
import {checkType, assertType} from './checkType.js';
import logger from './log.js';
var log = logger("manualDispose");

var disposeSymbol = Symbol("dispose");
var disposedSymbol = Symbol("disposed");

export function assertNotDisposed(obj)
{
    if (obj[disposedSymbol])
    {
        throw new Error("This object has been disposed");
    }
}

export function registerDispose(obj, cb)
{
    if (!checkType("object", obj) && !checkType("function", obj)){throw new Error("register dispose requires an object or a function");}
    if (!checkType("function", cb)){throw new Error("cb must be a function");}
    if (obj[disposedSymbol]){throw new Error("This object has already been disposed")}
    
    if (!obj[disposeSymbol]){obj[disposeSymbol]=[];}    
    obj[disposeSymbol].push(once(cb));
}

//this function links two objects such that if the primary is disposed then the secondary 
//will also be disposed even if they're not part of the same object tree
export function registerDisposeChain(objPrimary, objSecondary)
{
    registerDispose(objPrimary, dispose.bind(null, objSecondary));
}

export function dispose(obj)
{
    if (!obj || obj[disposedSymbol])
    {
        //do nothing
    }
    else if (obj[disposeSymbol])
    {
        obj[disposedSymbol] = true;
        
        obj[disposeSymbol].forEach(function(cb)
        {
            try
            {
                cb();
            }
            catch(error)
            {
                log.error(error);
            }
        });
        delete obj[disposeSymbol];
    }
    else if (typeof obj === "object")
    {        
        obj[disposedSymbol] = true;
        Object.values(obj).forEach(dispose);
    }
}