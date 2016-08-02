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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* harmony export */ exports["a"] = logger;function logger(name)
	{
	    var prefix = `[${name}]`;
	    
	    var isBrowser = false;
	    try{isBrowser = window && window.console;}
	    catch(ignored){}

	    var log;
	    if (isBrowser)
	    {
	        log = {
	            debug: window.console.debug.bind(window.console, prefix),
	            warn: window.console.warn.bind(window.console, prefix),
	            error: window.console.error.bind(window.console, prefix),
	            info: window.console.info.bind(window.console, prefix),
	            trace: window.console.trace.bind(window.console, prefix)
	        }
	    }
	    else
	    {
	        log = {
	            debug: console.log.bind(console, '[DEBUG]'+prefix),
	            warn: console.log.bind(console, '[WARN]'+prefix),
	            error: console.log.bind(console, '[ERROR]'+prefix),
	            info: console.log.bind(console, '[INFO]'+prefix),
	            trace: console.log.bind(console, '[TRACE]'+prefix),
	        }
	    }
	    if (isBrowser && !window.enableCoterminusLogs || !global.enableCoterminusLogs)
	    {
	        log.debug = function(){};
	        log.warn = log.debug;
	        log.info = log.debug;
	        log.trace = log.debug;
	    }
	    return log;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js___default = __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__ && __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0__lib_cycle_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkType_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cache_js__ = __webpack_require__(5);
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
	    /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__checkType_js__["a"]({
	        name:"string",
	        version: "string",
	        
	        priority: "?number",
	        
	        onRegister: "?function",
	        onDeregister: "?function",

	        onConnect: "?function",
	        onDisconnect: "?function",
	        
	        onSerialize: "?function",
	        onDeserialize:"?function",
	        
	        needsChannel : "?boolean"
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
	        capabilities_map[fname] = Capability;
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

	/* harmony export */ exports["b"] = checkType;/* harmony export */ exports["a"] = assertType;/*
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
	                return checkType({"test":"function","exec":"function"}, actual);
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
	                obj[key]=replace;
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

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
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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

	/* harmony default export */ exports["a"] = function ({Coterminous, Transport, Capability})
	{
	    var result = {};
	    if (Coterminous){result.App = getScopedCache(Coterminous, Capability)}
	    if (Transport){result.Connection = getScopedCache(Transport, Capability)}
	    return result;
	}



/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);

	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("Subscription");

	/* harmony default export */ exports["a"] = class
	{
	    constructor ()
	    {
	        var cbs = [];
	        this.publish = function(obj)
	        {
	            cbs.forEach(function(cb)
	            {
	                try{cb(obj);}
	                catch(err){log.error(err);}
	            });
	        }
	        this.subscribe = function(cb)
	        {
	            if (cbs.indexOf(cb) === -1)
	            {
	                cbs.push(cb);
	            }
	        }
	        this.unsubscribe = function(cb)
	        {
	            var index = cbs.indexOf(cb);
	            if (index !== -1)
	            {
	                cbs.splice(index, 1);
	            }
	        }
	        this.readOnly = {
	            subscribe: this.subscribe,
	            unsubscribe: this.unsubscribe
	        };
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__ = __webpack_require__(11);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js___default = __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__ && __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1__src_handshaker_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__ = __webpack_require__(14);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js___default = __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__ && __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_functionPassing_js__ = __webpack_require__(10);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_promisePassing_js__ = __webpack_require__(12);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_datePassing_js__ = __webpack_require__(9);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_regexPassing_js__ = __webpack_require__(13);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_subscriptionPassing_js__ = __webpack_require__(15);








	/* harmony default export */ exports["default"] = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__src_coterminous_js__["c"]

	try
	{
	    (function(){return this})().Coterminous = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__src_coterminous_js__["c"];
	}
	catch(ignored){}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walkObject_js__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkType_js__ = __webpack_require__(2);




	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("datePassing");
	var Capability = {
	    "name":"datePassing",
	    "version":"0.0.1",
	    "needsChannel":false,
	    "onSerialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["b"].bind(null, "date"), function(date)
	        {
	            return {"$date":date.getTime()};
	        });
	    },
	    "onDeserialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["b"].bind(null, {"$date":"number"}), function(d)
	        {
	            return new Date(d.$date);
	        });
	    }
	}
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__coterminous_js__["a"](Capability);

	/* unused harmony default export */ var _unused_webpack_default_export = {}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walkObject_js__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkType_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__deferred_js__ = __webpack_require__(4);





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
	                if (/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["b"]("promise", result))
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
	    },
	    "onConnect":function({Cache, Channel})
	    {
	        Cache.Connection.Local = {};
	        Cache.Connection.LocalReverse = new WeakMap();
	        Cache.Connection.Remote = {};
	        Cache.Connection.Channel = Channel;
	        Cache.Connection.Responses = {};
	    },
	    "onSerialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["b"].bind(null, "function"), function(fn)
	        {
	            var id;
	            if (!Cache.Connection.LocalReverse.has(fn))
	            {
	                id = fnRefIdCount++;
	                Cache.Connection.LocalReverse.set(fn,id);
	                Cache.Connection.Local[id]=fn;
	            }
	            return {"$fnRef":id};
	        });
	    },
	    "onDeserialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["b"].bind(null, {"$fnRef":"number"}), function(fn)
	        {
	            if(!Cache.Connection.Remote[fn.$fnRef])
	            {
	                Cache.Connection.Remote[fn.$fnRef] = remoteProxy.bind(null, Cache, fn.$fnRef);
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

	/* unused harmony default export */ var _unused_webpack_default_export = {}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkType_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cache_js__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__subscription_js__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_cycle_js__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_cycle_js___default = __WEBPACK_IMPORTED_MODULE_5__lib_cycle_js__ && __WEBPACK_IMPORTED_MODULE_5__lib_cycle_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_5__lib_cycle_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_5__lib_cycle_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_5__lib_cycle_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_5__lib_cycle_js___default });







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
	        Cache.App[TransportsSymbol] = new WeakMap();
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
	    Message.m = JSON.decycle(Message.m);
	    
	    var TransportCache = /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Transport, Capability:HandshakerCapability}).Connection;
	    TransportCache[SerializersSymbol].forEach(function(s){
	        try{
	       s.onSerialize({Message:Message.m, Cache:/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Coterminous, Transport, Capability:s})}); 
	        }
	        catch(err)
	        {
	            log.error(`${Capability.fname} threw an Exception while Serializing.`, err)
	        }
	    });
	    log.debug("Sending: ", JSON.stringify(Message))
	    Transport.send(Message);
	}



	function doHandshake({Coterminous, Transport, Cache})
	{
	    /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__checkType_js__["a"]( 
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
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__checkType_js__["a"]("object", msg, "msg");
	        processOutgoingMessage({Coterminous:this.Coterminous, Transport:this.Transport, Message:{c:this.RemoteChannelId, m:msg}});
	    }
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walkObject_js__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkType_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__deferred_js__ = __webpack_require__(4);





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
	        Cache.Connection.LocalReverse = new WeakMap();
	        Cache.Connection.Remote = {};
	        Cache.Connection.Channel = Channel;
	    },
	    "onSerialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["b"].bind(null, "promise"), function(promise)
	        {
	            var id;
	            if (!Cache.Connection.LocalReverse.has(promise))
	            {
	                id = promiseRefIdCount++;
	                Cache.Connection.LocalReverse.set(promise,id);
	                promise.then(sendResult.bind(null, Cache, id, true), sendResult.bind(null, Cache, id, false));
	            }
	            return {"$promise":id};
	        });
	    },
	    "onDeserialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["b"].bind(null, {"$promise":"number"}), function(p)
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walkObject_js__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkType_js__ = __webpack_require__(2);




	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("regexPassing");
	var Capability = {
	    "name":"regexPassing",
	    "version":"0.0.1",
	    "needsChannel":false,
	    "onSerialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["b"].bind(null, "regex"), function(regex)
	        {
	            return {"$regex":regex.source, "flags":regex.flags};
	        });
	    },
	    "onDeserialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["b"].bind(null, {"$regex":"string", "flags":"string"}), function(r)
	        {
	            return new RegExp(r.$regex, r.flags);
	        });
	    }
	}
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__coterminous_js__["a"](Capability);

	/* unused harmony default export */ var _unused_webpack_default_export = {}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cache_js__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__deferred_js__ = __webpack_require__(4);




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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walkObject_js__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkType_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__deferred_js__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__subscription_js__ = __webpack_require__(7);






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
	    },
	    "onConnect":function({Cache, Channel})
	    {
	        Cache.Connection.LocalReverse = new WeakMap();
	        Cache.Connection.Remote = {};
	        Cache.Connection.Channel = Channel;
	    },
	    "onSerialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["b"].bind(null, "subscription"), function(subscription)
	        {
	            var id;
	            if (!Cache.Connection.LocalReverse.has(subscription))
	            {
	                id = subscriptionRefIdCount++;
	                Cache.Connection.LocalReverse.set(subscription,id);
	                subscription.subscribe(sendPublish.bind(null, Cache, id));
	            }
	            return {"$subscription":id};
	        });
	    },
	    "onDeserialize":function({Message, Cache})
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__walkObject_js__["a"](Message, /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__checkType_js__["b"].bind(null, {"$subscription":"number"}), function(p)
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

	function sendPublish(Cache, subscriptionRef, ...args)
	{
	    Cache.Connection.Channel.send({publish:subscriptionRef, args:args});
	}

	/* unused harmony default export */ var _unused_webpack_default_export = {}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);


/***/ }
/******/ ]);