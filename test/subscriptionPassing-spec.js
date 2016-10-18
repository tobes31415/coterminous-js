import assert from 'assert';
import Coterminous from '../publish.js';
import connect from './testConnection.js';
import logger from '../src/log.js';
import Subscription from '../src/subscription.js';
import {assertType} from '../src/checkType.js';
import {registerDispose, dispose, isDisposed} from '../src/manualDispose.js';
import sinon from 'sinon';
var log = new logger("subscriptionPassing-spec");

var spy = sinon.spy();

describe('subscriptionPassing', function() {
    beforeEach(function(){
        spy = sinon.spy();
    });

    it('When the original publishes an event, the proxy receives the event as well', function(done){
        var sub = new Subscription();
        Coterminous.root({
            remote: sub
        });

        connect().then(function(remoteInterface) 
        {
            remoteInterface.remote.subscribe(spy);
            sub.publish();
            assert(spy.called);
            done();
        });
    });
    
    it('Arguments passed to the subscription are sent to the proxy as well', function(done){  
        var sub = new Subscription();
        Coterminous.root({
            remote: sub
        });

        connect().then(function(remoteInterface) 
        {
            remoteInterface.remote.subscribe(spy);
            sub.publish("abc", 123);
            assert(spy.calledWith("abc", 123));
            done();
        });
    });
    
    it('When the transport disconnects the proxy is disposed', function(done){
        var sub = new Subscription();
        Coterminous.root({
            remote: sub
        });

        var connection = connect();
        connection.then(function(remoteInterface) 
        {
            remoteInterface.remote.subscribe(spy);
            dispose(connection);
            setTimeout(function(){
                assert(isDisposed(remoteInterface.remote));
                done(); 
            }, 50);
        });
    });
});
