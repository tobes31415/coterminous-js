var cbs = Symbol("cbs");
export default class
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