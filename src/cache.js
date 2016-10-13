import {dispose} from './manualDispose.js';

var cacheStorage = new WeakMap();
function getScopedCache(obj, scope)
{
    var cache = cacheStorage.get(obj);
    if (!cache)
    {
        cache = new WeakMap();
        cacheStorage.set(obj, cache);
    }
    
    var scoped = cache.get(scope);
    if (!scoped)
    {
        scoped = {};
        cache.set(scope, scoped);
    };
    return scoped;
}

export default function ({Coterminous, Transport, Capability})
{
    var result = {};
    if (Coterminous){result.App = getScopedCache(Coterminous, Capability)}
    if (Transport){result.Connection = getScopedCache(Transport, Capability)}
    return result;
}

export function disposeRoot(obj)
{
    var cache = cacheStorage.get(obj);
    if (cache)
    {
        dispose(cache);
        cacheStorage.delete(obj);
    }
}

