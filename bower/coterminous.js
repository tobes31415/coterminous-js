/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_js__ = __webpack_require__(9);
	/* harmony export */ exports["a"] = logger;

	function logger(name)
	{
	    var prefix = `[${name}]`;
	    
	    var log;
	    try
	    {
	        log = {
	            debug: /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__global_js__["a"].console.debug.bind(/* harmony import */ __WEBPACK_IMPORTED_MODULE_0__global_js__["a"].console, prefix),
	            warn: /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__global_js__["a"].console.warn.bind(/* harmony import */ __WEBPACK_IMPORTED_MODULE_0__global_js__["a"].console, prefix),
	            error: /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__global_js__["a"].console.error.bind(/* harmony import */ __WEBPACK_IMPORTED_MODULE_0__global_js__["a"].console, prefix),
	            info: /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__global_js__["a"].console.info.bind(/* harmony import */ __WEBPACK_IMPORTED_MODULE_0__global_js__["a"].console, prefix),
	            trace: /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__global_js__["a"].console.trace.bind(/* harmony import */ __WEBPACK_IMPORTED_MODULE_0__global_js__["a"].console, prefix)
	        }
	    }
	    catch(ignored)
	    {}
	    if(!log)
	    {
	        log = {
	            debug: console.log.bind(console, '[DEBUG]'+prefix),
	            warn: console.log.bind(console, '[WARN]'+prefix),
	            error: console.log.bind(console, '[ERROR]'+prefix),
	            info: console.log.bind(console, '[INFO]'+prefix),
	            trace: console.log.bind(console, '[TRACE]'+prefix),
	        }
	    }
	    if (!/* harmony import */ __WEBPACK_IMPORTED_MODULE_0__global_js__["a"].enableCoterminusLogs)
	    {
	        log.debug = function(){};
	        log.warn = log.debug;
	        log.info = log.debug;
	        log.trace = log.debug;
	    }
	    return log;
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__ = __webpack_require__(10);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js___default = __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__ && __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0__lib_cycle_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkType_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cache_js__ = __webpack_require__(7);
	/* harmony export */ exports["a"] = registerCapability;/* harmony export */ exports["b"] = getCapabilities;



	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__log_js__["a"]("Coterminous");

	var capabilities_map = {};
	var channelCount = 1;

	class Coterminous
	{

	}
	var singleton = new Coterminous();
	/* harmony default export */ exports["c"] = singleton

	function registerCapability(Capability)
	{
	    /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__checkType_js__["b"]({
	        name:"string",
	        version: "string",
	        
	        priority: "?number",
	        
	        onRegister: "?function",
	        onDeregister: "?function",

	        onConnect: "?function",
	        onDisconnect: "?function",
	        
	        onSerialize: "?function",
	        onDeserialize:"?function",
	        
	        needsChannel : "?boolean",
	        
	        localOnly : "?boolean" //capabilities that add helper functions but are not used for remote communication
	    }, Capability);
	    
	    var lname = Capability.name.toLowerCase();
	    var lversion = Capability.version.toLowerCase();
	    lname = lname.replace(/:/g,"");
	    lversion = lversion.replace(/:/g,"");
	    var fname = lname+":"+lversion;
	    if (capabilities_map.hasOwnProperty(lversion))
	    {
	        throw new Error(`Duplicate Registration ${lname}:${lversion}`);
	    }
	    Capability.name = lname;
	    Capability.version = lversion;
	    Capability.fname = fname;
	    if (!Capability.priority){Capability.priority = 50;}
	    if (Capability.priority < 1){Capability.priority=1;}
	    if (Capability.priority > 100){Capability.priority=100;}
	    
	    if (Capability.needsChannel)
	    {
	        Capability.channel = channelCount++;
	    }
	    try
	    {
	        if(Capability.onRegister)
	        {
	            Capability.onRegister({Coterminous:singleton, Cache:/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Coterminous:singleton, Capability})});
	        }
	        if (!Capability.localOnly)
	        {
	            capabilities_map[fname] = Capability;
	        }
	        log.debug(`Registered ${lname}:${lversion}`)
	    }
	    catch(err)
	    {
	        log.error(err);
	        throw err;
	    }
	}

	function getCapabilities()
	{
	    return capabilities_map;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = checkType;/* harmony export */ exports["b"] = assertType;/*
	 * Checks if the actual object matches the expected signiature
	 *
	 * Useage:
	 *  var userObj = {}
	 *  checkType({"name":"string","id":"number"}, userObj);
	 *  //fails
	 *  userObj.name = "Joe";
	 *  userObj.id = 123;
	 *  checkType({"name":"string","id":"number"}, userObj);
	 *  //passes
	 * 
	 * Types supported directly:
	 *  Number, Boolean, String, Function, Object, Array
	 * Types supported via Duck-Typing
	 *  Promise, Subscription, Date, Regex
	 *
	 * Optional Properties
	 *  Prefix a key name with a question mark '?' to mark it as optional 
	 *  If the actual object does not contain the key it will pass
	 *  If the object contains the key but it's null it will pass
	 *  If the object contains the key but it's a different type it will fail
	 *  
	 *  var userObj = {};
	 *  checkType({"?name":"string","?id":"number"}, userObj);
	 *  //passes
	 *  userObj.name = 123;
	 *  checkType({"?name":"string","?id":"number"}, userObj);
	 *  //fails
	 */
	function checkType(expected, actual)
	{
	    if (typeof expected==="string")
	    {
	        if (expected[0]==='?')
	        {
	            if (typeof actual==="undefined" || actual === null)
	            {return true;}
	            expected = expected.substring(1);
	        }
	        expected = expected.toLowerCase();
	        switch(expected)
	        {
	            case "undefined":
	            case "number":
	            case "boolean":
	            case "string":
	            case "function":
	                return typeof actual === expected;
	            case "array":
	                return Array.isArray(actual);
	            case "promise":
	                return checkType({"then":"function"}, actual);
	            case "subscription":
	                return checkType({"subscribe":"function","unsubscribe":"function"}, actual);
	            case "date":
	                return checkType({"getTime":"function"}, actual);
	            case "regex":
	            case "regexp":
	                return checkType({"test":"function","exec":"function","source":"string"}, actual);
	            case "object":
	                return typeof actual === expected && actual !== null;
	            default:
	                throw new TypeError("unrecognized type "+ expected);
	            
	        }
	    }
	    else if (typeof expected === "object" && expected && !Array.isArray(expected))
	    {
	        if (!actual)
	        {
	            return false;
	        }
	        for(var key in expected)
	        {
	            if (key[0]==='?')
	            {
	                key = key.substring(1);
	                if (typeof actual[key] === "undefined" || actual[key] === null)
	                {continue;}
	            }
	            if (!checkType(expected[key], actual[key]))
	            {return false;}
	        }
	        return true;
	    }
	    else
	    {
	        throw new TypeError("Expected must be a string or an oject")
	    }
	}

	/*
	 *  If checkType fails it throws an exception
	 */
	function assertType(expected, actual, name)
	{
	    if(!checkType(expected, actual))
	    {
	        throw new TypeError("Was expecting "+(name?name+" to match ":"")+JSON.stringify(expected));
	    }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__once_js__ = __webpack_require__(11);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__checkType_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__log_js__ = __webpack_require__(0);
	/* harmony export */ exports["assertNotDisposed"] = assertNotDisposed;/* harmony export */ exports["isDisposed"] = isDisposed;/* harmony export */ exports["registerDispose"] = registerDispose;/* harmony export */ exports["registerDisposeChain"] = registerDisposeChain;/* harmony export */ exports["disposable"] = disposable;/* harmony export */ exports["dispose"] = dispose;


	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__log_js__["a"]("manualDispose");

	var disposeSymbol = Symbol("dispose");
	var disposedSymbol = Symbol("disposed");

	const ERROR_OBJECT_DISPOSED = "This object has been disposed";
	const ERROR_FUNCTION_DISPOSED = "This function has been disposed";

	function assertNotDisposed(obj)
	{
	    if (obj[disposedSymbol])
	    {
	        throw new Error(ERROR_OBJECT_DISPOSED);
	    }
	}

	function isDisposed(obj)
	{
	    return obj[disposedSymbol];
	}

	function registerDispose(obj, cb)
	{
	    if (!/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__checkType_js__["a"]("object", obj) && !/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__checkType_js__["a"]("function", obj)){throw new Error("register dispose requires an object or a function");}
	    if (!/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__checkType_js__["a"]("function", cb)){throw new Error("cb must be a function");}
	    if (obj[disposedSymbol]){throw new Error("This object has already been disposed")}
	    
	    if (!obj[disposeSymbol]){obj[disposeSymbol]=[];}    
	    obj[disposeSymbol].push(/* harmony import */ __WEBPACK_IMPORTED_MODULE_0__once_js__["a"](cb));
	}

	//this function links two objects such that if the primary is disposed then the secondary 
	//will also be disposed even if they're not part of the same object tree
	function registerDisposeChain(objPrimary, objSecondary)
	{
	    registerDispose(objPrimary, dispose.bind(null, objSecondary));
	}

	function disposable(fnRef)
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

	function dispose(obj)
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	function walkObject(obj, condition, onFind)
	{
	    for (var key in obj)
	    {
	        var val = obj[key];
	        if (condition(val))
	        {
	            var replace = onFind(val);
	            if (typeof replace !== "undefined")
	            {
	                if (typeof replace === "object" && replace.__$replaceByUndefined)
	                {
	                    obj[key]=undefined;
	                }
	                else
	                {
	                    obj[key]=replace;
	                }
	            }
	        }
	        else
	        {
	            if (typeof val === "object")
	            {
	                walkObject(val, condition, onFind);
	            }
	        }
	    }
	}

	/* harmony default export */ exports["a"] = function(obj, condition, onFind)
	{walkObject(obj, condition, onFind);}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__manualDispose_js__ = __webpack_require__(3);


	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("Subscription");

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
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__manualDispose_js__["registerDispose"](self, function(){
	            Object.values(self[storageSymbol]).forEach(/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__manualDispose_js__["dispose"]);
	            Object.values(self[keysSymbol]).forEach(/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__manualDispose_js__["dispose"]);
	            delete self[storageSymbol];
	            delete self[keysSymbol];
	        })
	    }
	    
	    delete(key)
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__manualDispose_js__["assertNotDisposed"](this);
	        var id = idOf(key);
	        var result = this[storageSymbol].hasOwnProperty(id);
	        delete this[storageSymbol][id];
	        delete this[keysSymbol][id];
	        return result;
	    }
	    
	    get(key)
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__manualDispose_js__["assertNotDisposed"](this);
	        return this[storageSymbol][idOf(key)];
	    }
	    
	    has(key)
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__manualDispose_js__["assertNotDisposed"](this);
	        return this[storageSymbol].hasOwnProperty(idOf(key));
	    }
	    
	    set(key, value)
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__manualDispose_js__["assertNotDisposed"](this);
	        if (!key || (typeof key !== "object" && typeof key !== "function"))
	        {
	            throw new Error("key must be an object or a function");
	        }
	        this[storageSymbol][idOf(key)] = value;
	        this[keysSymbol][idOf(key)] = key;
	        return this;
	    }
	}

	/* harmony default export */ exports["a"] = StrongMap

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__ = __webpack_require__(3);


	/* harmony default export */ exports["a"] = class
	{
	    constructor ()
	    {
	        var self = this;
	        var promise = new Promise(function(resolve, reject){
	            self.resolve = resolve;
	            self.reject = reject;
	        });
	        self.promise = promise;
	        
	        var cleanup = function(){
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__["dispose"](self);
	        };
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__["registerDispose"](self, self.reject);
	        promise.then(cleanup, cleanup);
	    }
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strongMap_js__ = __webpack_require__(5);
	/* harmony export */ exports["b"] = disposeRoot;


	var cacheStorage = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__strongMap_js__["a"]();
	function getScopedCache(obj, scope)
	{
	    var cache = cacheStorage.get(obj);
	    if (!cache)
	    {
	        cache = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__strongMap_js__["a"]();
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

	/* harmony default export */ exports["a"] = function ({Coterminous, Transport, Capability})
	{
	    var result = {};
	    if (Coterminous){result.App = getScopedCache(Coterminous, Capability)}
	    if (Transport){result.Connection = getScopedCache(Transport, Capability)}
	    return result;
	}

	function disposeRoot(obj)
	{
	    var cache = cacheStorage.get(obj);
	    if (cache)
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__["dispose"](cache);
	        cacheStorage.delete(obj);
	    }
	}



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__log_js__ = __webpack_require__(0);


	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__log_js__["a"]("Subscription");

	class Subscription
	{
	    constructor ()
	    {
	        var self = this;
	        var cbs = [];
	        self.publish = function(...obj)
	        {
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__["assertNotDisposed"](self);
	            cbs.forEach(function(cb)
	            {
	                try{cb(...obj);}
	                catch(err){log.error(err);}
	            });
	        }
	        self.subscribe = function(cb)
	        {
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__["assertNotDisposed"](self);
	            if (cbs.indexOf(cb) === -1)
	            {
	                cbs.push(cb);
	            }
	        }
	        self.unsubscribe = function(cb)
	        {
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__["assertNotDisposed"](self);
	            var index = cbs.indexOf(cb);
	            if (index !== -1)
	            {
	                cbs.splice(index, 1);
	            }
	        }
	        self.readOnly = {
	            subscribe: self.subscribe,
	            unsubscribe: self.unsubscribe
	        };
	        
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__["registerDispose"](self, function(){
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__["dispose"](cbs);
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__["dispose"](self.subscribe);
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__["dispose"](self.unsubscribe);
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__["dispose"](self.publish);
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__manualDispose_js__["dispose"](self.readOnly);
	            cbs = null;
	        });
	    }
	}

	/* harmony default export */ exports["a"] = Subscription

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {function getGlobal()
	{
	    var globalRef;

	    (function(){globalRef=this;})();
	    if (!globalRef)
	    {
	        try{globalRef = window;}catch(ignored){}
	        try{globalRef = global;}catch(ignored){}
	    }
	    return globalRef;
	}

	/* harmony default export */ exports["a"] = getGlobal()
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
	    cycle.js
	    2016-05-01

	    Public Domain.

	    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

	    This code should be minified before deployment.
	    See http://javascript.crockford.com/jsmin.html

	    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
	    NOT CONTROL.
	*/

	/*jslint eval, for */

	/*property
	    $ref, decycle, forEach, isArray, keys, length, push, retrocycle, stringify,
	    test
	*/

	if (typeof JSON.decycle !== "function") {
	    JSON.decycle = function decycle(object, replacer) {
	        "use strict";

	// Make a deep copy of an object or array, assuring that there is at most
	// one instance of each object or array in the resulting structure. The
	// duplicate references (which might be forming cycles) are replaced with
	// an object of the form

	//      {"$ref": PATH}

	// where the PATH is a JSONPath string that locates the first occurance.

	// So,

	//      var a = [];
	//      a[0] = a;
	//      return JSON.stringify(JSON.decycle(a));

	// produces the string '[{"$ref":"$"}]'.

	// If a replacer function is provided, then it will be called for each value.
	// A replacer function receives a value and returns a replacement value.

	// JSONPath is used to locate the unique object. $ indicates the top level of
	// the object or array. [NUMBER] or [STRING] indicates a child element or
	// property.

	        var objects = [];   // Keep a reference to each unique object or array
	        var paths = [];     // Keep the path to each unique object or array

	        return (function derez(value, path) {

	// The derez function recurses through the object, producing the deep copy.

	            var i;          // The loop counter
	            var nu;         // The new object or array

	// If a replacer function was provided, then call it to get a replacement value.

	            if (replacer !== undefined) {
	                value = replacer(value);
	            }

	// typeof null === "object", so go on if this value is really an object but not
	// one of the weird builtin objects.

	            if (
	                typeof value === "object" && value !== null &&
	                !(value instanceof Boolean) &&
	                !(value instanceof Date) &&
	                !(value instanceof Number) &&
	                !(value instanceof RegExp) &&
	                !(value instanceof Promise) &&
	                !(value instanceof String)
	            ) {

	// If the value is an object or array, look to see if we have already
	// encountered it. If so, return a {"$ref":PATH} object. This is a hard
	// linear search that will get slower as the number of unique objects grows.
	// Someday, this should be replaced with an ES6 WeakMap.

	                i = objects.indexOf(value);
	                if (i >= 0) {
	                    return {$ref: paths[i]};
	                }

	// Otherwise, accumulate the unique value and its path.

	                objects.push(value);
	                paths.push(path);

	// If it is an array, replicate the array.

	                if (Array.isArray(value)) {
	                    nu = [];
	                    value.forEach(function (element, i) {
	                        nu[i] = derez(element, path + "[" + i + "]");
	                    });
	                } else {

	// If it is an object, replicate the object.

	                    nu = {};
	                    Object.keys(value).forEach(function (name) {
	                        nu[name] = derez(
	                            value[name],
	                            path + "[" + JSON.stringify(name) + "]"
	                        );
	                    });
	                }
	                return nu;
	            }
	            return value;
	        }(object, "$"));
	    };
	}


	if (typeof JSON.retrocycle !== "function") {
	    JSON.retrocycle = function retrocycle($) {
	        "use strict";

	// Restore an object that was reduced by decycle. Members whose values are
	// objects of the form
	//      {$ref: PATH}
	// are replaced with references to the value found by the PATH. This will
	// restore cycles. The object will be mutated.

	// The eval function is used to locate the values described by a PATH. The
	// root object is kept in a $ variable. A regular expression is used to
	// assure that the PATH is extremely well formed. The regexp contains nested
	// * quantifiers. That has been known to have extremely bad performance
	// problems on some browsers for very long strings. A PATH is expected to be
	// reasonably short. A PATH is allowed to belong to a very restricted subset of
	// Goessner's JSONPath.

	// So,
	//      var s = '[{"$ref":"$"}]';
	//      return JSON.retrocycle(JSON.parse(s));
	// produces an array containing a single element which is the array itself.

	        var px = /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;

	        (function rez(value) {

	// The rez function walks recursively through the object looking for $ref
	// properties. When it finds one that has a value that is a path, then it
	// replaces the $ref object with a reference to the value that is found by
	// the path.

	            if (value && typeof value === "object") {
	                if (Array.isArray(value)) {
	                    value.forEach(function (element, i) {
	                        if (typeof element === "object" && element !== null) {
	                            var path = element.$ref;
	                            if (typeof path === "string" && px.test(path)) {
	                                value[i] = eval(path);
	                            } else {
	                                rez(element);
	                            }
	                        }
	                    });
	                } else {
	                    Object.keys(value).forEach(function (name) {
	                        var item = value[name];
	                        if (typeof item === "object" && item !== null) {
	                            var path = item.$ref;
	                            if (typeof path === "string" && px.test(path)) {
	                                value[name] = eval(path);
	                            } else {
	                                rez(item);
	                            }
	                        }
	                    });
	                }
	            }
	        }($));
	        return $;
	    };
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony default export */ exports["a"] = function(cb)
	{
	    var didRun = false;
	    return function(...args)
	    {
	        if (didRun){return;}
	        didRun = true;
	        cb(...args)
	        cb = null;
	    }
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__ = __webpack_require__(17);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js___default = __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__ && __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1__src_handshaker_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__ = __webpack_require__(20);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js___default = __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__ && __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_functionPassing_js__ = __webpack_require__(16);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_promisePassing_js__ = __webpack_require__(18);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_datePassing_js__ = __webpack_require__(13);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_regexPassing_js__ = __webpack_require__(19);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_undefinedPassing_js__ = __webpack_require__(22);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_subscriptionPassing_js__ = __webpack_require__(21);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_externalGC_js__ = __webpack_require__(14);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_externalGC_js___default = __WEBPACK_IMPORTED_MODULE_9__src_externalGC_js__ && __WEBPACK_IMPORTED_MODULE_9__src_externalGC_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_9__src_externalGC_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_9__src_externalGC_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_9__src_externalGC_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_9__src_externalGC_js___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_externalUtilities_js__ = __webpack_require__(15);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_externalUtilities_js___default = __WEBPACK_IMPORTED_MODULE_10__src_externalUtilities_js__ && __WEBPACK_IMPORTED_MODULE_10__src_externalUtilities_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_10__src_externalUtilities_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_10__src_externalUtilities_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_10__src_externalUtilities_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_10__src_externalUtilities_js___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_global_js__ = __webpack_require__(9);













	/* harmony default export */ exports["default"] = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__src_coterminous_js__["c"]

	try
	{
	    /* harmony import */ __WEBPACK_IMPORTED_MODULE_11__src_global_js__["a"].Coterminous = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__src_coterminous_js__["c"];
	}
	catch(ignored){}
	try
	{
	    module.exports = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__src_coterminous_js__["c"];
	}
	catch(ignored){}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walkObject_js__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkType_js__ = __webpack_require__(2);




	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("datePassing");
	var Capability = {
	    "name":"datePassing",
	    "version":"0.0.1",
	    "needsChannel":false,
	    "onSerialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["a"].bind(null, "date"), function(date)
	        {
	            return {"$date":date.getTime()};
	        });
	    },
	    "onDeserialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["a"].bind(null, {"$date":"number"}), function(d)
	        {
	            return new Date(d.$date);
	        });
	    }
	}
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__coterminous_js__["a"](Capability);

	/* unused harmony default export */ var _unused_webpack_default_export = {}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manualDispose_js__ = __webpack_require__(3);



	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("external disposing");

	var Capability = {
	    "name":"externalDisposing",
	    "version":"0.0.1",
	    "localOnly":true,
	    "onRegister":function({Coterminous})
	    {
	        Coterminous.GC = /* harmony namespace import */ __WEBPACK_IMPORTED_MODULE_2__manualDispose_js__;
	    }
	}

	/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__coterminous_js__["a"](Capability);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkType_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__deferred_js__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__once_js__ = __webpack_require__(11);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__strongMap_js__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__subscription_js__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__walkObject_js__ = __webpack_require__(4);









	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("external disposing");

	var Capability = {
	    "name":"externalUtilities",
	    "version":"0.0.1",
	    "localOnly":true,
	    "onRegister":function({Coterminous})
	    {
	        Coterminous.util = {
	            once: /* harmony import */ __WEBPACK_IMPORTED_MODULE_4__once_js__["a"],
	            checkType: /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__checkType_js__["a"],
	            assertType: /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__checkType_js__["b"],
	            Deferred: /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__deferred_js__["a"],
	            logger: /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"],
	            StrongMap:/* harmony import */ __WEBPACK_IMPORTED_MODULE_5__strongMap_js__["a"],
	            Subscription:/* harmony import */ __WEBPACK_IMPORTED_MODULE_6__subscription_js__["a"],
	            walkObject:/* harmony import */ __WEBPACK_IMPORTED_MODULE_7__walkObject_js__["a"]
	        };
	    }
	}

	/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__coterminous_js__["a"](Capability);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walkObject_js__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkType_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__deferred_js__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__manualDispose_js__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__strongMap_js__ = __webpack_require__(5);







	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("functionPassing");

	var fnRefIdCount = 1;
	var Capability = {
	    "name":"functionPassing",
	    "version":"0.0.1",
	    "needsChannel":true,
	    "priority": 100,
	    "onReceive":function({Cache, Channel, Interface, Message})
	    {
	        if (Message.invoke)
	        {
	            var fn = Cache.Connection.Local[Message.invoke];
	            var sendResolve = function(...args){
	                Channel.send({resolve:Message.respondTo, args:args});
	            } 
	            var sendReject = function(...args){
	                Channel.send({reject:Message.respondTo, args:args});
	            }
	            try
	            {  
	                var result = fn(...Message.args);
	                if (/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["a"]("promise", result))
	                {
	                    result.then(sendResolve, sendReject);
	                }
	                else
	                {
	                    sendResolve(result);
	                }
	            }
	            catch(err)
	            {
	                sendReject(err);
	            }
	        }
	        else if (Message.resolve)
	        {
	            Cache.Connection.Responses[Message.resolve].resolve(... Message.args);
	            delete Cache.Connection.Responses[Message.resolve];
	        }
	        else if (Message.reject)
	        {
	            Cache.Connection.Responses[Message.reject].reject(... Message.args);
	            delete Cache.Connection.Responses[Message.reject];            
	        }
	        else if (Message.forget)
	        {
	            var fn = Cache.Connection.Remote[Message.forget];
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_5__manualDispose_js__["dispose"](fn);
	            delete Cache.Connection.Remote[Message.forget];
	        }
	    },
	    "onConnect":function({Cache, Channel})
	    {
	        Cache.Connection.Local = {};
	        Cache.Connection.LocalReverse = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_6__strongMap_js__["a"]();
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_5__manualDispose_js__["registerDispose"](Cache.Connection, function(){
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_5__manualDispose_js__["dispose"](Cache.Connection.DisposeList);
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_5__manualDispose_js__["dispose"](Cache.Connection.Remote);
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_5__manualDispose_js__["dispose"](Cache.Connection.Responses);
	        });

	        Cache.Connection.DisposeList = [];
	        Cache.Connection.Remote = {};
	        Cache.Connection.Channel = Channel;
	        Cache.Connection.Responses = {};
	    },
	    "onSerialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["a"].bind(null, "function"), function(fn)
	        {
	            var id;
	            if (!Cache.Connection.LocalReverse.has(fn))
	            {
	                id = fnRefIdCount++;
	                Cache.Connection.LocalReverse.set(fn,id);
	                Cache.Connection.Local[id]=/* harmony import */ __WEBPACK_IMPORTED_MODULE_5__manualDispose_js__["disposable"](fn);
	                var token = {};
	                /* harmony import */ __WEBPACK_IMPORTED_MODULE_5__manualDispose_js__["registerDispose"](token, disposeProxy.bind(null, Cache, id));
	                Cache.Connection.DisposeList.push(token);
	                
	                //if the function itself is ever disposed we want to trigger the dispose action on each transport it's used in
	                /* harmony import */ __WEBPACK_IMPORTED_MODULE_5__manualDispose_js__["registerDisposeChain"](fn, token);
	            }
	            else
	            {
	                id = Cache.Connection.LocalReverse.get(fn)
	            }
	            return {"$fnRef":id};
	        });
	    },
	    "onDeserialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["a"].bind(null, {"$fnRef":"number"}), function(fn)
	        {
	            if(!Cache.Connection.Remote[fn.$fnRef])
	            {
	                Cache.Connection.Remote[fn.$fnRef] = /* harmony import */ __WEBPACK_IMPORTED_MODULE_5__manualDispose_js__["disposable"](remoteProxy.bind(null, Cache, fn.$fnRef));
	            }
	            return Cache.Connection.Remote[fn.$fnRef];
	        });
	    }
	}
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__coterminous_js__["a"](Capability);
	var responseIdCount = 1;
	function remoteProxy(Cache, fnRef, ...args)
	{
	    var responseId = responseIdCount++;
	    var result = Cache.Connection.Responses[responseId] = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_4__deferred_js__["a"]();
	    Cache.Connection.Channel.send({invoke:fnRef, args:args, respondTo:responseId});
	    return result.promise;
	}
	function disposeProxy(Cache, fnRef)
	{
	    Cache.Connection.Channel.send({forget:fnRef});
	    try{Cache.Connection.LocalReverse.delete(Cache.Connection.Local[fnRef]);}catch(ignored){}
	    delete Cache.Connection.Local[fnRef];
	}

	/* unused harmony default export */ var _unused_webpack_default_export = {}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkType_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cache_js__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__subscription_js__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__strongMap_js__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_cycle_js__ = __webpack_require__(10);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_cycle_js___default = __WEBPACK_IMPORTED_MODULE_6__lib_cycle_js__ && __WEBPACK_IMPORTED_MODULE_6__lib_cycle_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_6__lib_cycle_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_6__lib_cycle_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_6__lib_cycle_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_6__lib_cycle_js___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__manualDispose_js__ = __webpack_require__(3);










	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("Coterminus-handshaker");


	var TransportsSymbol = Symbol("transports");
	var channelsSymbol = Symbol("channels");
	var SerializersSymbol = Symbol("serializers");
	var DeserializersSymbol = Symbol("deserializers");

	function tryThis(fnRef, ...args)
	{
	    try
	    {
	        fnRef(...args);
	    }
	    catch(err)
	    {
	        log.error(err);
	    }
	}

	function compare(a,b)
	{
	    return a===b?0:(a<b?-1:1);
	}

	var HandshakerCapability = {
	    "name":"handshaker",
	    "version":"0.0.1",
	    "onRegister":function({Coterminous, Cache})
	    {
	        Cache.App[TransportsSymbol] = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_5__strongMap_js__["a"]();
	        Coterminous.connectTransport = function(Transport)
	        {
	            return doHandshake({Coterminous,Transport, Cache:/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Coterminous, Transport, Capability:HandshakerCapability})});
	        }       
	    } 
	};
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__coterminous_js__["a"](HandshakerCapability);


	function processIncomingMessage({Coterminous, Transport, Message, Cache})
	{
	    try{
	        var cid = Message.c;
	        var channels = Cache.Connection[channelsSymbol];
	        var channel=channels[Message.c];
	        var Capability = channel.Capability;
	        if (Capability.onReceive)
	        {
	            var TransportCache = /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Transport, Capability:HandshakerCapability}).Connection;
	            TransportCache[DeserializersSymbol].forEach(function(d){
	               try{d.onDeserialize({Message:Message.m, Cache:/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Coterminous, Transport, Capability:d})});}
	               catch(err){
	                   log.error(`${Capability.fname} threw an Exception while Deserializing.`, err)
	               }
	            });
	            
	            Message.m = JSON.retrocycle(Message.m);
	    
	            Capability.onReceive({Message:Message.m, Channel:channel, Cache:/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Coterminous, Transport, Capability})})
	            return;                
	        }
	        throw new Error("Channel isn't registered here")
	    }
	    catch(err){log.error("Failed to process message",err);}
	}

	var currentlyProcessing;
	var outgoingQueue = []
	function processOutgoingMessage({Coterminous, Transport, Message})
	{
	    outgoingQueue.push({Coterminous, Transport, Message});
	    if (!currentlyProcessing)
	    {
	        while(outgoingQueue.length > 0)
	        {
	            currentlyProcessing = outgoingQueue.shift(1);
	            _processOutgoingMessageInOrder(currentlyProcessing);
	        }
	        currentlyProcessing = null;
	    }
	}

	function _processOutgoingMessageInOrder({Coterminous, Transport, Message})
	{
	    if (/* harmony import */ __WEBPACK_IMPORTED_MODULE_7__manualDispose_js__["isDisposed"](Transport))
	    {
	        return;
	    }
	    Message.m = JSON.decycle(Message.m);
	    
	    var TransportCache = /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Transport, Capability:HandshakerCapability}).Connection;
	    TransportCache[SerializersSymbol].forEach(function(s){
	        try{
	       s.onSerialize({Message:Message.m, Cache:/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Coterminous, Transport, Capability:s})}); 
	        }
	        catch(err)
	        {
	            log.error(`${s.fname} threw an Exception while Serializing.`, err)
	        }
	    });
	    log.debug("Sending: ", JSON.stringify(Message))
	    Transport.send(Message);
	}



	function doHandshake({Coterminous, Transport, Cache})
	{
	    /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__checkType_js__["b"]( 
	    {
	        send:"function",
	        receive:"subscription",
	        disconnect:"function",
	        disconnected:"subscription"
	    }, Transport)
	    
	    if(Cache.App[TransportsSymbol].has(Transport))
	    {
	        throw new Error("Duplicate Connection Attempt");
	    }
	    Cache.App[TransportsSymbol].set(Transport, true);
	    
	    function basicDispose()
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["b"](Transport);
	    }
	    Transport.disconnected.subscribe(basicDispose);
	    
	    var result = new Promise(function(resolve, reject)
	    {
	        var capabilities = {};
	        var temp = /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__coterminous_js__["b"]();
	        for(let name in temp)
	        {
	            var capability = temp[name];
	            var meta = {
	            };
	            if (capability.channel)
	            {
	                meta.c = capability.channel;
	            }
	            capabilities[name]=meta;
	        }
	        Transport.send(capabilities);
	        var processHandshakeMessage = function(msg)
	        {
	            try
	            {
	                if (msg.c && msg.c !== 0){return;}
	                var channels = Cache.Connection[channelsSymbol]={};
	                Transport.receive.unsubscribe(processHandshakeMessage);
	                Transport.receive.subscribe(function(Message){
	                    processIncomingMessage({Coterminous, Transport, Message, Cache})
	                });
	                var mine = Object.keys(temp);
	                var theirs = Object.keys(msg);
	                var both = mine.filter(function(k){return theirs.indexOf(k)!=-1;});
	                var versionCheck = {};
	                var selected = {};
	                for(let name of both)
	                {
	                    var c = temp[name];
	                    if (!versionCheck[c.name]){versionCheck[c.name] = "0.0.0";}
	                    if (c.version > versionCheck[c.name])
	                    {
	                        versionCheck[c.name]=c.version;
	                        selected[c.name]=c;
	                    }
	                }
	                var sorted = [];
	                for (var key in selected)
	                {
	                    sorted.push(selected[key]);
	                }
	                sorted.sort(function(c1,c2){return compare(c1.priority, c2.priority);});
	                log.debug("The following capabilities have been selected", sorted);
	                var serializers = [];
	                var deserializers = [];
	                sorted.forEach(function(capability)
	                {
	                    if (capability.channel)
	                    {
	                        var channel = new Channel({Coterminous, Transport, LocalChannelId:capability.channel, RemoteChannelId:msg[capability.fname].c, Capability:capability});
	                    
	                        channels[capability.channel]=channel;
	                    }
	                    if (capability.onSerialize)
	                    {
	                        serializers.push(capability);
	                    }
	                    if (capability.onDeserialize)
	                    {
	                        deserializers.push(capability);
	                    }
	                    if (capability.onConnect)
	                    {
	                        tryThis(capability.onConnect, {Channel: channel, Cache:/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Coterminous, Transport, Capability:capability})});
	                    }
	                });
	                deserializers = deserializers.reverse();
	                Cache.Connection[SerializersSymbol] = serializers;
	                Cache.Connection[DeserializersSymbol]= deserializers;
	                resolve();
	                function advancedDispose()
	                {
	                    /* harmony import */ __WEBPACK_IMPORTED_MODULE_7__manualDispose_js__["dispose"](Transport);
	                    sorted.forEach(function(capability)
	                    {
	                       if (capability.onDisconnect) 
	                       {
	                           tryThis(capability.onDisconnect, {Channel:channel, Cache:/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Coterminous, Transport, Capability:capability})})
	                       }
	                    });
	                    
	                    /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["b"](Transport);
	                    channels = null;
	                }
	                Transport.disconnected.unsubscribe(basicDispose);
	                Transport.disconnected.subscribe(advancedDispose);
	            }
	            catch(err)
	            {reject(err);}
	        }
	        setTimeout(reject, 5000);
	        Transport.receive.subscribe(processHandshakeMessage);
	    });
	    result.then(null, function(){
	        try{Transport.disconnect();}
	        catch(ignored){};
	    });
	    return result;
	}

	class Channel
	{
	    constructor({Coterminous, LocalChannelId, RemoteChannelId, Transport, Capability}){
	        this.Coterminous = Coterminous;
	        this.Transport = Transport;
	        this.LocalChannelId = LocalChannelId;
	        this.RemoteChannelId = RemoteChannelId;
	        this.Capability = Capability;
	        this.receive = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_4__subscription_js__["a"]();
	    }
	    
	    //sends a message, using the full stack to serialize it, returns a promise
	    send(msg){
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__checkType_js__["b"]("object", msg, "msg");
	        processOutgoingMessage({Coterminous:this.Coterminous, Transport:this.Transport, Message:{c:this.RemoteChannelId, m:msg}});
	    }
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walkObject_js__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkType_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__deferred_js__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__strongMap_js__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__manualDispose_js__ = __webpack_require__(3);







	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("promisePassing");
	var promiseRefIdCount = 1;
	var Capability = {
	    "name":"promisePassing",
	    "version":"0.0.1",
	    "needsChannel":true,
	    "onReceive":function({Cache, Channel, Interface, Message})
	    {
	        if (Message.resolve)
	        {
	            Cache.Connection.Remote[Message.resolve].resolve(... Message.args);
	            delete Cache.Connection.Remote[Message.resolve];
	        }
	        else if (Message.reject)
	        {
	            Cache.Connection.Remote[Message.reject].reject(... Message.args);
	            delete Cache.Connection.Remote[Message.reject];            
	        }
	    },
	    "onConnect":function({Cache, Channel})
	    {
	        Cache.Connection.LocalReverse = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_5__strongMap_js__["a"]();
	        Cache.Connection.Remote = {};
	        Cache.Connection.Channel = Channel;
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_6__manualDispose_js__["registerDispose"](Cache.Connection, function(){
	            //don't allow LocalReverse to be disposed as the local reference could have been used by multiple transports
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_6__manualDispose_js__["dispose"](Cache.Connection.Remote);
	        });
	    },
	    "onSerialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["a"].bind(null, "promise"), function(promise)
	        {
	            var id;
	            if (!Cache.Connection.LocalReverse.has(promise.then))
	            {
	                id = promiseRefIdCount++;
	                Cache.Connection.LocalReverse.set(promise.then,id);
	                promise.then(sendResult.bind(null, Cache, id, true), sendResult.bind(null, Cache, id, false));
	            }
	            else
	            {
	                id = Cache.Connection.LocalReverse.get(promise.then)
	            }
	            return {"$promise":id};
	        });
	    },
	    "onDeserialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["a"].bind(null, {"$promise":"number"}), function(p)
	        {
	            if(!Cache.Connection.Remote[p.$promise])
	            {
	                Cache.Connection.Remote[p.$promise] = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_4__deferred_js__["a"]();
	            }
	            return Cache.Connection.Remote[p.$promise].promise;
	        });
	    }
	}
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__coterminous_js__["a"](Capability);

	function sendResult(Cache, promiseRef, isResolve, ...args)
	{
	    if (isResolve)
	    {
	        Cache.Connection.Channel.send({resolve:promiseRef, args:args});
	    }
	    else
	    {
	        Cache.Connection.Channel.send({reject:promiseRef, args:args});
	    }
	}

	/* unused harmony default export */ var _unused_webpack_default_export = {}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walkObject_js__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkType_js__ = __webpack_require__(2);




	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("regexPassing");
	var Capability = {
	    "name":"regexPassing",
	    "version":"0.0.1",
	    "needsChannel":false,
	    "onSerialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["a"].bind(null, "regex"), function(regex)
	        {
	            return {"$regex":regex.source, "flags":regex.flags};
	        });
	    },
	    "onDeserialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["a"].bind(null, {"$regex":"string", "flags":"string"}), function(r)
	        {
	            return new RegExp(r.$regex, r.flags);
	        });
	    }
	}
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__coterminous_js__["a"](Capability);

	/* unused harmony default export */ var _unused_webpack_default_export = {}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cache_js__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__deferred_js__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__manualDispose_js__ = __webpack_require__(3);





	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("Coterminus-rootInterface");

	var remoteRootPromise = Symbol("remoteRootPromise");
	var rootObjectSymbol = Symbol("rootObjectSymbol");
	var channelSymbol = Symbol("channel");
	var Capability = {
	    "name":"root",
	    "version":"0.0.1",
	    "needsChannel":true,
	    "onRegister":function({Coterminous, Cache})
	    {
	        Coterminous.connect = function(Transport)
	        {
	            return Coterminous.connectTransport(Transport).then(function()
	            {
	                var Cache = /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__cache_js__["a"]({Transport, Capability});
	                Cache.Connection[remoteRootPromise] = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__deferred_js__["a"]();
	                Cache.Connection[channelSymbol].send({"sendRoot":true});
	                return Cache.Connection[remoteRootPromise].promise;
	            })
	        }
	        Coterminous.root = function(newObjRoot)
	        {
	            Cache.App[rootObjectSymbol] = newObjRoot;
	        }
	    },
	    "onConnect":function({Cache, Channel})
	    {
	        Cache.Connection[channelSymbol]=Channel;
	    },
	    "onReceive":function({Cache, Channel, Message})
	    {
	        if (Message.sendRoot)
	        {
	            Channel.send(Cache.App[rootObjectSymbol]);
	        }
	        else
	        {
	            Cache.Connection[remoteRootPromise].resolve(Message);
	        }
	    }
	}

	/* harmony import */ __WEBPACK_IMPORTED_MODULE_2__coterminous_js__["a"](Capability);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walkObject_js__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkType_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__deferred_js__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__subscription_js__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__strongMap_js__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__manualDispose_js__ = __webpack_require__(3);








	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("subscriptionPassing");
	var subscriptionRefIdCount = 1;
	var Capability = {
	    "name":"subscriptionPassing",
	    "version":"0.0.1",
	    "needsChannel":true,
	    "onReceive":function({Cache, Channel, Interface, Message})
	    {
	        if (Message.publish)
	        {
	            Cache.Connection.Remote[Message.publish].publish(... Message.args);
	        }
	        else if (Message.forget)
	        {
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_7__manualDispose_js__["dispose"](Cache.Connection.Remote[Message.forget]);
	            delete Cache.Connection.Remote[Message.forget];
	        }
	    },
	    "onConnect":function({Cache, Channel})
	    {
	        Cache.Connection.LocalReverse = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_6__strongMap_js__["a"]();
	        Cache.Connection.Remote = {};
	        Cache.Connection.Channel = Channel;
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_7__manualDispose_js__["registerDispose"](Cache.Connection, function(){
	            //don't allow LocalReverse to be disposed as the subscriptions may be in use elsewhere
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_7__manualDispose_js__["dispose"](Cache.Connection.Remote);
	        });
	    },
	    "onSerialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["a"].bind(null, "subscription"), function(subscription)
	        {
	            var id;
	            if (!Cache.Connection.LocalReverse.has(subscription.subscribe))
	            {
	                id = subscriptionRefIdCount++;
	                Cache.Connection.LocalReverse.set(subscription.subscribe,id);
	                subscription.subscribe(sendPublish.bind(null, Cache, id));
	                linkDisposeFunction(Cache, subscription.subscribe, id);
	            }
	            else
	            {
	                id = Cache.Connection.LocalReverse.get(subscription.subscribe);
	            }
	            return {"$subscription":id};
	        });
	    },
	    "onDeserialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["a"].bind(null, {"$subscription":"number"}), function(p)
	        {
	            if(!Cache.Connection.Remote[p.$subscription])
	            {
	                Cache.Connection.Remote[p.$subscription] = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_5__subscription_js__["a"]();
	            }
	            return Cache.Connection.Remote[p.$subscription].readOnly;
	        });
	    }
	}
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__coterminous_js__["a"](Capability);

	function linkDisposeFunction(Cache, subscription, subscriptionRef)
	{
	    /* harmony import */ __WEBPACK_IMPORTED_MODULE_7__manualDispose_js__["registerDispose"](subscription, function()
	    {
	        Cache.Connection.Channel.send({forget:subscriptionRef});
	        delete Cache.Connection.Remote[subscriptionRef];
	    });
	}

	function sendPublish(Cache, subscriptionRef, ...args)
	{
	    Cache.Connection.Channel.send({publish:subscriptionRef, args:args});
	}

	/* unused harmony default export */ var _unused_webpack_default_export = {}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walkObject_js__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkType_js__ = __webpack_require__(2);




	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("regexPassing");
	var Capability = {
	    "name":"undefinedPassing",
	    "version":"0.0.1",
	    "needsChannel":false,
	    "onSerialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["a"].bind(null, "undefined"), function(regex)
	        {
	            return {"$undefined":true};
	        });
	    },
	    "onDeserialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["a"].bind(null, {"$undefined":"boolean"}), function(r)
	        {
	            return {"__$replaceByUndefined":true};
	        });
	    }
	}
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__coterminous_js__["a"](Capability);

	/* unused harmony default export */ var _unused_webpack_default_export = {}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12);


/***/ }
/******/ ]);