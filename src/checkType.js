/*
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
export function checkType(expected, actual)
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
export function assertType(expected, actual, name)
{
    if(!checkType(expected, actual))
    {
        throw new TypeError("Was expecting "+(name?name+" to match ":"")+JSON.stringify(expected));
    }
}