import assert from 'assert'
import StrongMap from '../src/strongMap.js';
import {assertType} from '../src/checkType.js';
import {dispose} from '../src/manualDispose.js';
import sinon from 'sinon';

var obj;
var keyObj;
var keyObj2;
var keyFn
var value1;
var value2;
var value3;

describe('StrongMap', () => {
  beforeEach(function(){
      obj = new StrongMap();
      keyObj = {};
      keyObj2 = {};
      keyFn = function(){};
      value1 = 123;
      value2 = 456;
      value3 = 789;
  });  
    
  it('is a function', () => {
    assertType("function", StrongMap);
  });
  it('returns an object with delete, get, has, set', function()
  {
      assertType({
          "delete":"function",
          "get":"function",
          "has":"function",
          "set":"function"
      }, obj);
  });
  it('value1s can set', function(){
      obj.set(keyObj, value1);
  });
  it('value1s can be fetched', function(){
      obj.set(keyObj, value1);
      assert.equal(obj.get(keyObj), value1);
  });
  it('keys can be objects', function(){
      obj.set(keyObj, value1);
      assert.equal(obj.get(keyObj), value1);
  });
  it('keys can be functions', function(){
      obj.set(keyFn, value1);
      assert.equal(obj.get(keyFn), value1);
  });
  it('keys can not be primitives', function(){
      assert.throws(function(){
          obj.set(123, value1);
      });
      assert.throws(function(){
          obj.set(true, value1);
      });
      assert.throws(function(){
          obj.set("hello", value1);
      });
  });
  it('keys can not be null or undefined', function(){
      assert.throws(function(){
          obj.set(null, value1);
      });
      assert.throws(function(){
          obj.set(undefined, value1);
      });
  });
  
  it('multiple keys work', function(){
      obj.set(keyObj, value1);
      obj.set(keyFn, value2);
      obj.set(keyObj2, value3);
      
      assert.equal(obj.get(keyObj), value1);
      assert.equal(obj.get(keyFn), value2);
      assert.equal(obj.get(keyObj2), value3);
  });
  
  it('has indicates if a key is in the map', function(){
      assert(!obj.has(keyObj));
      obj.set(keyObj, value1);
      assert(obj.has(keyObj));
      obj.delete(keyObj);
      assert(!obj.has(keyObj));
  });
  
  it('delete returns true if the key had been present', function(){
      assert(!obj.delete(keyObj));
      obj.set(keyObj, value1);
      assert(obj.delete(keyObj));
      assert(!obj.delete(keyObj));
  });
  
  it('set returns the map instance', function(){
      assert.equal(obj, obj.set(keyObj, value1));
  });
});
