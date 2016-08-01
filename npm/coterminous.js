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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js___default = __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__ && __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0__lib_cycle_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__log_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkType_js__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cache_js__ = __webpack_require__(0);
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
	    /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__checkType_js__["a"](Capability, {
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
	    });
	    
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* unused harmony export default *//* harmony export */ exports["a"] = assertType;/*
	 * Checks if the actual object matches the expected signiature
	 *
	 * Useage:
	 *  var userObj = {}
	 *  checkType(userObj, {"name":"string","id":"number"});
	 *  //fails
	 *  userObj.name = "Joe";
	 *  userObj.id = 123;
	 *  checkType(userObj, {"name":"string","id":"number"});
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
	 *  checkType(userObj, {"?name":"string","?id":"number"});
	 *  //passes
	 *  userObj.name = 123;
	 *  checkType(userObj, {"?name":"string","?id":"number"});
	 *  //fails
	 */
	function checkType(actual, expected)
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
	                return checkType(actual, {"then":"function"});
	            case "subscription":
	                return checkType(actual, {"subscribe":"function","unsubscribe":"function"});
	            case "date":
	                return checkType(actual, {"getTime":"function"});
	            case "regex":
	            case "regexp":
	                return checkType(actual, {"test":"function","exec":"function"});
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
	            if (!checkType(actual[key], expected[key]))
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
	function assertType(actual, expected, name)
	{
	    if(!checkType(actual, expected))
	    {
	        throw new TypeError("Was expecting "+(name?name+" to match ":"")+JSON.stringify(expected));
	    }
	}

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js___default = __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__ && __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1__src_handshaker_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1__src_handshaker_js___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js___default = __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__ && __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2__src_rootInterface_js___default });



	/* harmony default export */ exports["default"] = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__src_coterminous_js__["c"]

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkType_js__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cache_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__subscription_js__ = __webpack_require__(9);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_cycle_js__ = __webpack_require__(4);
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
	            return doHandshake({Coterminous,Transport, Cache});
	        }       
	    } 
	};
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__coterminous_js__["a"](HandshakerCapability);


	function processIncomingMessage({Coterminous, Transport, Message})
	{
	    try{
	        log.debug("Processing a channled message");
	        var cid = Message.c;
	        var channels = /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Transport, Capability:HandshakerCapability}).Connection[channelsSymbol];
	        var channel=channels[Message.c];
	        var Capability = channel.Capability;
	        if (Capability.onReceive)
	        {
	            var TransportCache = /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Transport, Capability:HandshakerCapability}).Connection;
	            TransportCache[DeserializersSymbol].forEach(function(d){
	               d.onDeserialize({Message:Message.m, Cache:/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Coterminous, Transport, Capability:d})}); 
	            });
	            
	            Message.m = JSON.retrocycle(Message.m);
	    
	            Capability.onReceive({Message:Message.m, Channel:channel, Cache:/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Coterminous, Transport, Capability})})
	            return;                
	        }
	        throw new Error("Channel isn't registered here")
	    }
	    catch(err){log.error("Failed to process message",err);}
	}

	function processOutgoingMessage({Coterminous, Transport, Message})
	{
	    Message.m = JSON.decycle(Message.m);
	    
	    var TransportCache = /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Transport, Capability:HandshakerCapability}).Connection;
	    TransportCache[SerializersSymbol].forEach(function(s){
	       s.onSerialize({Message:Message.m, Cache:/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Coterminous, Transport, Capability:s})}); 
	    });
	    
	    Transport.send(Message);
	}



	function doHandshake({Coterminous, Transport, Cache})
	{
	    /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__checkType_js__["a"](Transport, 
	    {
	        send:"function",
	        receive:"subscription",
	        disconnect:"function",
	        disconnected:"subscription"
	    })
	    
	    if(Cache.App[TransportsSymbol].has(Transport))
	    {
	        throw new Error("Duplicate Connection Attempt");
	    }
	    Cache.App[TransportsSymbol].set(Transport, true);
	    
	    var result = new Promise(function(resolve, reject)
	    {
	        log.debug("handshake beginning");
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
	                log.debug("received a reply");
	                Transport.receive.unsubscribe(processHandshakeMessage);
	                Transport.receive.clear();
	                Transport.receive.subscribe(function(Message){
	                    processIncomingMessage({Coterminous, Transport, Message})
	                });
	                var mine = Object.keys(temp);
	                var theirs = Object.keys(msg);
	                var both = mine.filter(function(k){return theirs.indexOf(k)!=-1;});
	                log.debug("mine", mine, "theirs", theirs, "both", both);
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
	                var TransportCache = /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Transport, Capability:HandshakerCapability}).Connection;
	                var channels = TransportCache[channelsSymbol]={};
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
	                        deserializers.push(onDeserialize);
	                    }
	                    if (capability.onConnect)
	                    {
	                        tryThis(capability.onConnect, {Channel: channel, Cache:/* harmony import */ __WEBPACK_IMPORTED_MODULE_3__cache_js__["a"]({Coterminous, Transport, Capability:capability})});
	                    }
	                });
	                deserializers = deserializers.reverse();
	                TransportCache[SerializersSymbol] = serializers;
	                TransportCache[DeserializersSymbol]= deserializers;
	                log.debug("handshaking complete");
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
	        log.debug("Sending ", msg, "on Remote Channel ", this.RemoteChannelId);
	        processOutgoingMessage({Coterminous:this.Coterminous, Transport:this.Transport, Message:{c:this.RemoteChannelId, m:msg}});
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cache_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__coterminous_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__deferred_js__ = __webpack_require__(6);




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
	        log.debug("onRegister");
	        Coterminous.connect = function(Transport)
	        {
	            log.debug("Coterminous.connect");
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
	            log.debug("Coterminous.root", newObjRoot);
	            Cache.App[rootObjectSymbol] = newObjRoot;
	        }
	    },
	    "onConnect":function({Cache, Channel})
	    {
	        log.debug("onConnect");
	        Cache.Connection[channelSymbol]=Channel;
	    },
	    "onReceive":function({Cache, Channel, Message})
	    {
	        log.debug("onReceive", Message);
	        if (Message.sendRoot)
	        {
	            log.debug("Responding to root request")
	            Channel.send(Cache.App[rootObjectSymbol]);
	        }
	        else
	        {
	            log.debug("Received a remote root ", Message)
	            Cache.Connection[remoteRootPromise].resolve(Message);
	        }
	    }
	}
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_2__coterminous_js__["a"](Capability);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var cbs = Symbol("cbs");
	/* harmony default export */ exports["a"] = class
	{
	    constructor ()
	    {
	        this[cbs] = [];
	        this.publish = this._publish.bind(this);
	        this.subscribe = this._subscribe.bind(this);
	    }
	    
	    _publish(obj)
	    {
	        this[cbs].forEach(function(cb){cb(obj);})
	    }
	    
	    _subscribe(cb)
	    {
	        this[cbs].push(cb);
	    }
	    
	    unsubscribe(cb)
	    {}
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);


/***/ }
/******/ ]);