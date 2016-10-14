import {dispose, registerDispose} from './manualDispose.js';

export default class
{
    constructor ()
    {
        var self = this;
        var promise = new Promise(function(resolve, reject){
            self.resolve = resolve;
            self.reject = reject;
        });
        self.promise = promise;
        
        var cleanup = function(){
            dispose(self);
        };
        registerDispose(self, self.reject);
        promise.then(cleanup, cleanup);
    }
}