export default function(cb)
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
