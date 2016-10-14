import {registerDispose, dispose, assertNotDisposed} from './manualDispose.js';
import logger from './log.js';
var log = logger("Subscription");

class Subscription
{
    constructor ()
    {
        var self = this;
        var cbs = [];
        this.publish = function(obj)
        {
            assertNotDisposed(self);
            cbs.forEach(function(cb)
            {
                try{cb(obj);}
                catch(err){log.error(err);}
            });
        }
        this.subscribe = function(cb)
        {
            assertNotDisposed(self);
            if (cbs.indexOf(cb) === -1)
            {
                cbs.push(cb);
            }
        }
        this.unsubscribe = function(cb)
        {
            assertNotDisposed(self);
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
        
        registerDispose(this, function(){
            dispose(cbs);
            cbs = null;
        });
    }
}

export default (Subscription);