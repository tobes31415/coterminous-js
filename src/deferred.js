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
    }
}