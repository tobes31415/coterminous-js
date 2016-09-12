import logger from './log.js';
var log = logger("Subscription");

class Subscription
{
    constructor ()
    {
        var cbs = [];
        this.publish = function(obj)
        {
            cbs.forEach(function(cb)
            {
                try{cb(obj);}
                catch(err){log.error(err);}
            });
        }
        this.subscribe = function(cb)
        {
            if (cbs.indexOf(cb) === -1)
            {
                cbs.push(cb);
            }
        }
        this.unsubscribe = function(cb)
        {
            var index = cbs.indexOf(cb);
            if (index !== -1)
            {
                cbs.splice(index, 1);
            }
        }
        this.readOnly = {
            subscribe: this.subscribe,
            unsubscribe: this.unsubscribe
        };
    }
}

export default (Subscription);