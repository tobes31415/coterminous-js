import {registerDispose, dispose, assertNotDisposed} from './manualDispose.js';
import logger from './log.js';
var log = logger("Subscription");

class Subscription
{
    constructor ()
    {
        var self = this;
        var cbs = [];
        self.publish = function(...obj)
        {
            assertNotDisposed(self);
            cbs.forEach(function(cb)
            {
                try{cb(...obj);}
                catch(err){log.error(err);}
            });
        }
        self.subscribe = function(cb)
        {
            assertNotDisposed(self);
            if (cbs.indexOf(cb) === -1)
            {
                cbs.push(cb);
            }
        }
        self.unsubscribe = function(cb)
        {
            assertNotDisposed(self);
            var index = cbs.indexOf(cb);
            if (index !== -1)
            {
                cbs.splice(index, 1);
            }
        }
        self.readOnly = {
            subscribe: self.subscribe,
            unsubscribe: self.unsubscribe
        };
        
        registerDispose(self, function(){
            dispose(cbs);
            dispose(self.subscribe);
            dispose(self.unsubscribe);
            dispose(self.publish);
            dispose(self.readOnly);
            cbs = null;
        });
    }
}

export default (Subscription);