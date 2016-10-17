import assert from 'assert'
import once from '../src/once.js';
import {checkType} from '../src/checkType.js';
import sinon from 'sinon';

describe('once', () => {
  it('is a function', () => {
    assert(checkType("function", once));
  });
  it('accepts a function as first argument', function(){
      assert.doesNotThrow(function(){
          once(function(){});
      });
  });
  it('returns a function',function(){
      var foo = once(function(){});
      assert(checkType("function", foo));
  });
  it('invokes the original function when the proxy is invoked', function(){
      var spy = sinon.spy();
      var foo = once(spy);
      foo();
      assert(spy.calledOnce);
  });
  it('ignores subsequent invocations', function(){
      var spy = sinon.spy();
      var foo = once(spy);
      foo();
      foo();
      assert(spy.calledOnce);
  });
});
