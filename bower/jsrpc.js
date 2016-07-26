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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_JsRpc_js__ = __webpack_require__(1);

	/* harmony default export */ exports["default"] = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__src_JsRpc_js__["a"]

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js___default = __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__ && __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0__lib_cycle_js___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0__lib_cycle_js___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__log_js__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkType_js__ = __webpack_require__(2);



	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__log_js__["a"]("JsRpc");

	var capabilities = {};

	class JsRpc
	{
	    registerCapability(options)
	    {
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__checkType_js__["a"](options, {
	            name:"string",
	            version: "string",
	            
	            onRegister: "?function",
	            onDeregister: "?function",
	            
	            onCreateInterface: "?function",
	            onDisposeInterface: "?function",

	            onConnect: "?function",
	            onDisconnect: "?function",
	            
	            onSend: "?function",
	            onReceive: "?function"
	        });
	        
	        var lname = options.name.toLowerCase();
	        var lversion = options.version.toLowerCase();
	        var versions = capabilities[lname];
	        if (!versions)
	        {
	            versions = capabilities[lname]={};
	        }
	        if (versions.hasOwnProperty(lversion))
	        {
	            throw new Error(`Duplicate Registration ${lname}:${lversion}`);
	        }
	        try
	        {
	            if(options.onRegister)
	            {
	                options.onRegister();
	            }
	            versions[lversion] = options;
	            log.trace(`Registered ${lname}:${lversion}`)
	        }
	        catch(err)
	        {
	            log.error(err);
	            throw err;
	        }
	    }
	    
	    createInterface()
	    {
	        return new JsRpc_Interface();
	    }
	}
	var singleton = new JsRpc();


	class JsRpc_Interface
	{
	    constructor()
	    {
	        for(let versions of capabilities)
	        {
	            var sortedVersions = [];
	            for(version in versions){sortedVersions.push(version);}
	            sortedVersions.sort().reverse();
	            for(let version of sortedVersions)
	            {
	                var options = versions[version];
	                if (options.onCreateInterface)
	                {
	                    options.onCreateInterface();
	                }
	            }
	        }
	    }
	}

	/* harmony default export */ exports["a"] = singleton

/***/ },
/* 2 */
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
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = logger;function logger(name)
	{
	    var prefix = `[${name}]`;
	    return {
	        debug: window.console.debug.bind(window.console, prefix),
	        warn: window.console.warn.bind(window.console, prefix),
	        error: window.console.error.bind(window.console, prefix),
	        info: window.console.info.bind(window.console, prefix),
	        trace: window.console.trace.bind(window.console, prefix)
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(0);


/***/ }
/******/ ]);