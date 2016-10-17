import assert from 'assert'
import deferred from '../src/deferred.js';
import {assertType} from '../src/checkType.js';
import {dispose} from '../src/manualDispose.js';
import sinon from 'sinon';

describe('deferred', () => {
  it('is a function', () => {
    assertType("function", deferred);
  });
  it('returns an object with promise, resolve, and reject', function()
  {
      var obj = new deferred();
      assertType({
          "promise":"promise",
          "resolve":"function",
          "reject":"function"
      }, obj);
  });
  it('calling resolve resolves the promise', function(done){
      var obj = new deferred();
      var spy = sinon.spy();
      obj.promise.then(function(){
        assert(spy.notCalled);    
        done();
      }, spy);
      obj.resolve();
  });
  it('calling reject rejects the promise', function(){
      var obj = new deferred();
      var spy = sinon.spy();
      obj.promise.then(spy, function(){
        assert(spy.notCalled);    
        done();
      });
      obj.reject();
  });
  it('disposing the deferred rejects the promise', function(){
      var obj = new deferred();
      var spy = sinon.spy();
      obj.promise.then(spy, function(){
        assert(spy.notCalled);    
        done();
      });
      dispose(obj);
  })
});
