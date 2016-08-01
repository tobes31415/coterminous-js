/*
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
export default function checkType(actual, expected)
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
export function assertType(actual, expected, name)
{
    if(!checkType(actual, expected))
    {
        throw new TypeError("Was expecting "+(name?name+" to match ":"")+JSON.stringify(expected));
    }
}

export function checkTypeCurryable(expected, actual)
{
    return checkType(actual, expected);
}