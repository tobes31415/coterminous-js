var cbs = Symbol("cbs");
var lastValue = Symbol("lastValue");
export default class
{
    constructor ()
    {
        this[cbs] = [];
        this[lastValue] = [];
        this.publish = this._publish.bind(this);
        this.subscribe = this._subscribe.bind(this);
    }
    
    _publish(obj)
    {
        if (this[cbs].length === 0)
        {
            this[lastValue].push(obj);    
        }
        else
        {
            this[cbs].forEach(function(cb){cb(obj);})
        }
    }
    
    _subscribe(cb)
    {
        this[cbs].push(cb);
        if(this[lastValue])
        {
            var temp = this[lastValue];
            delete this[lastValue];
            temp.forEach(cb);
        }
    }
    
    unsubscribe(cb)
    {}
}