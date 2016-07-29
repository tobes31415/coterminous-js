/*
 * This is a simple 2-sided transport to assist in testing and development
 */
export default class
{
    constructor(options)
    {
        var Asub = new Sub();
        var Bsub = new Sub();
        this.A = new LoopbackTransportSide(Asub, Bsub);
        this.B = new LoopbackTransportSide(Bsub, Asub);
    }
}

class LoopbackTransportSide
{   
    constructor(mine, other)
    {
        this.send = mine.publish
        this.receive = other        
        this.disconnect=function(){}        
        this.disconnected=new Sub();
    }
}

var cbs = Symbol("cbs");
var lastValue = Symbol("lastValue");
class Sub
{
    constructor ()
    {
        this[cbs] = [];
        this.publish = this._publish.bind(this);
        this.subscribe = this._subscribe.bind(this);
    }
    
    _publish(obj)
    {
        this[lastValue] = obj;
        this[cbs].forEach(function(cb){cb(obj);})
    }
    
    _subscribe(cb)
    {
        this[cbs].push(cb);
        if(this[lastValue])
        {
            cb(this[lastValue]);
        }
    }
    
    unsubscribe(cb)
    {}
}