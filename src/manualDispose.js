import once from './once.js';
import {checkType, assertType} from './checkType.js';
import logger from './log.js';
var log = logger("manualDispose");

var disposeSymbol = Symbol("dispose");
var disposedSymbol = Symbol("disposed");

const ERROR_OBJECT_DISPOSED = "This object has been disposed";
const ERROR_FUNCTION_DISPOSED = "This function has been disposed";

export function assertNotDisposed(obj)
{
    if (obj[disposedSymbol])
    {
        throw new Error(ERROR_OBJECT_DISPOSED);
    }
}

export function isDisposed(obj)
{
    return obj[disposedSymbol];
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

export function disposable(fnRef)
{
    var disposableFnRef = function(...args)
    {
        if (disposableFnRef[disposedSymbol])
        {
            throw new Error(ERROR_FUNCTION_DISPOSED);
        }
        return fnRef(...args);
    }
    registerDispose(disposableFnRef, function(){
        fnRef = null;
    });
    return disposableFnRef;
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
                var skipError = true;
                if (error && error.message)
                {
                    skipError |= error.message === ERROR_OBJECT_DISPOSED;
                    skipError |= error.message === ERROR_FUNCTION_DISPOSED;
                }
                //if (!skipError)
                {
                    log.error(error);
                }
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