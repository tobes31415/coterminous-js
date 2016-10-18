import assert from 'assert';
import Coterminous from '../publish.js';
import connect from './testConnection.js';
import logger from '../src/log.js';
import {assertType} from '../src/checkType.js';
import {registerDispose, dispose} from '../src/manualDispose.js';
import sinon from 'sinon';
var log = new logger("promisePassing-spec");

var spy = sinon.spy();

describe('promisePassing', function() {
    beforeEach(function(){
        spy = sinon.spy();
    });

    it('When the original returns a promise that resolves then the proxy promise resolves', function(done){
        
        Coterminous.root({
            remote: new Promise(function(resolve, reject){
                setTimeout(resolve, 50);
            })
        });

        connect().then(function(remoteInterface) 
        {
            remoteInterface.remote.then(function(){done();});
        });
    });
    
    it('Arguments to resolve are passed to the proxy', function(done){
        
        Coterminous.root({
            remote: new Promise(function(resolve, reject){
                resolve({"a":"abc", "b":123, "c":{foo:function(){}}});
            })
        });

        connect().then(function(remoteInterface) 
        {
            remoteInterface.remote.then(function(value){
                assertType({a:"string",b:"number","c":{"foo":"function"}}, value);
                done();
            });
        });
    });
    
    it('When the original fails then the proxy promise rejects', function(done){  
        Coterminous.root({
            remote: new Promise(function(resolve, reject){
                setTimeout(reject, 50);
            })
        });

        connect().then(function(remoteInterface) 
        {
            remoteInterface.remote.then(null, function(){done();});
        });
    });
    
    it('When the transport disconnects before responding then the proxy promise rejects', function(done){
        Coterminous.root({
            remote: new Promise(function(resolve, reject){})
        });

        var testConnection = connect();
        testConnection.then(function(remoteInterface) 
        {
            remoteInterface.remote.then(null, function(){done();});
            dispose(testConnection);
        });
    });
});
