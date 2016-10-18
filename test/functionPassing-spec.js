import assert from 'assert';
import Coterminous from '../publish.js';
import connect from './testConnection.js';
import logger from '../src/log.js';
import {assertType} from '../src/checkType.js';
import {registerDispose, dispose} from '../src/manualDispose.js';
import sinon from 'sinon';
var log = new logger("functionpassing-spec");

var spy = sinon.spy();

describe('functionPassing', function() {
    beforeEach(function(){
        spy = sinon.spy();
    });
    
    it('invoking the proxy invokes the original', function(done){
        Coterminous.root({
            remote: spy
        });

        connect().then(function(remoteInterface) 
        {
            remoteInterface.remote();
            assert(spy.called);
            done();
        });
    });
    
    it('When invoking a remote function the caller gets a promise', function(done){
        Coterminous.root({
            remote: spy
        });

        connect().then(function(remoteInterface) 
        {
            assertType("promise", remoteInterface.remote());
            done();
        });
    });
    
    it('When the original completes then the proxy promise resolves', function(done){
        var stub = sinon.stub().returns();
        
        Coterminous.root({
            remote: stub
        });

        connect().then(function(remoteInterface) 
        {
            remoteInterface.remote().then(function(){done();});
        });
    });
    
    it('When the original fails then the proxy promise rejects', function(done){
        var stub = sinon.stub().throws();
        
        Coterminous.root({
            remote: stub
        });

        connect().then(function(remoteInterface) 
        {
            remoteInterface.remote().then(null, function(){done();});
        });
    });
    
    it('When the original returns a promise that resolves then the proxy promise resolves', function(done){
        var stub = sinon.stub().returns(new Promise(function(resolve, reject){
            setTimeout(resolve, 50);
        }));
        
        Coterminous.root({
            remote: stub
        });

        connect().then(function(remoteInterface) 
        {
            remoteInterface.remote().then(function(){done();});
        });
    });
    
    it('When the original fails then the proxy promise rejects', function(done){
        var stub = sinon.stub().returns(new Promise(function(resolve, reject){
            setTimeout(reject, 50);
        }));   
        Coterminous.root({
            remote: stub
        });

        connect().then(function(remoteInterface) 
        {
            remoteInterface.remote().then(null, function(){done();});
        });
    });
    
    it('When the transport disconnects before responding then the proxy promise rejects', function(done){
        var stub = sinon.stub().returns(new Promise(function(resolve, reject){
        }));   
        Coterminous.root({
            remote: stub
        });

        var testConnection = connect();
        testConnection.then(function(remoteInterface) 
        {
            remoteInterface.remote().then(null, function(){done();});
            dispose(testConnection);
        });
    });
});
