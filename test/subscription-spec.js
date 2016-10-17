import "babel-polyfill";
import assert from 'assert'
import subscription from '../src/subscription.js';
import {assertType} from '../src/checkType.js';
import {registerDispose, dispose} from '../src/manualDispose.js';
import sinon from 'sinon';

var obj;
var spy;

describe('Subscription', () => {
  beforeEach(function(){
    obj = new subscription();
    spy = sinon.spy();
  });  
    
  it('is a function', () => {
    assertType("function", subscription);
  });
  it('returns an object with publish, subscribe, unsubscribe, and readOnly', function()
  {
      assertType({
          "publish":"function",
          "subscribe":"function",
          "unsubscribe":"function",
          "readOnly":{
              "subscribe":"function",
              "unsubscribe":"function"
          }
      }, obj);
  });
  it('cb is invoked when publish called', function(){
      obj.subscribe(spy);
      obj.publish();
      assert(spy.called);
  });
  it('cb is not invoked when publish called after cb has unsubscribed', function(){
      obj.subscribe(spy);
      obj.unsubscribe(spy);
      obj.publish();
      assert(spy.notCalled);
  });
  it('dispose chains to any subscribed cbs', function(){
      obj.subscribe(spy);
      var disposeSpy = sinon.spy();
      registerDispose(spy, disposeSpy);
      dispose(obj);
      assert(disposeSpy.called);
  });
});
