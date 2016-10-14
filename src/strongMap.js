import logger from './log.js';
import {registerDispose, dispose, assertNotDisposed} from './manualDispose.js';
var log = logger("Subscription");

var storageSymbol = Symbol("innerStorage");
var keysSymbol = Symbol("keyRefs");

var nextId = 0;
var idSymbol = Symbol("Cache Id");
function idOf(obj)
{
    if (!obj) {throw new Error("Object must not be null");}
    if (!obj[idSymbol])
    {
        obj[idSymbol]=nextId++;
    }
    return obj[idSymbol];
}

class StrongMap
{
    constructor ()
    {
        var self = this;
        self[storageSymbol] = {};
        self[keysSymbol]={};
        registerDispose(self, function(){
            Object.values(self[storageSymbol]).forEach(dispose);
            Object.values(self[keysSymbol]).forEach(dispose);
            delete self[storageSymbol];
            delete self[keysSymbol];
        })
    }
    
    delete(key)
    {
        assertNotDisposed(this);
        var id = idOf(key);
        var result = this[storageSymbol].hasOwnProperty(id);
        delete this[storageSymbol][id];
        delete this[keysSymbol][id];
        return result;
    }
    
    get(key)
    {
        assertNotDisposed(this);
        return this[storageSymbol][idOf(key)];
    }
    
    has(key)
    {
        assertNotDisposed(this);
        return this[storageSymbol].hasOwnProperty(idOf(key));
    }
    
    set(key, value)
    {
        assertNotDisposed(this);
        if (!key || (typeof key !== "object" && typeof key !== "function"))
        {
            throw new Error("key must be an object or a function");
        }
        this[storageSymbol][idOf(key)] = value;
        this[keysSymbol][idOf(key)] = key;
        return this;
    }
}

export default (StrongMap);