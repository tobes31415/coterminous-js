var cbs = Symbol("cbs");
var lastValue = Symbol("lastValue");
export default class
{
    constructor ()
    {
        this[cbs] = [];
        this.publish = this._publish.bind(this);
        this.subscribe = this._subscribe.bind(this);
        this.clear = this._clear.bind(this);
    }
    
    _clear()
    {
        delete this[lastValue]; 
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