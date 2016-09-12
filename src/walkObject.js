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

export default function(obj, condition, onFind)
{walkObject(obj, condition, onFind);}