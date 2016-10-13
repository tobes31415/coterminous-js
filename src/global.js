function getGlobal()
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

export default getGlobal();