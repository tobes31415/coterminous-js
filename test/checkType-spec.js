import assert from 'assert'
import deferred from '../src/deferred.js';
import {assertType, checkType} from '../src/checkType.js';
import {dispose} from '../src/manualDispose.js';
import sinon from 'sinon';

describe('checkType', () => {
  it('is a function', () => {
    assert.equal(typeof checkType, 'function');
  });
  it('1st argument accepts strings and objects', function()
  {
      checkType('string', 'hello world');
      checkType({'foo':'string'}, {'foo':'hello world'});
  });
  it('1st argument rejects arrays and all other types', function()
  {
      assert.throws(function(){
          checkType(['string'], 'hello world');
      });
      assert.throws(function(){
          checkType(123, 'hello world');
      });
      assert.throws(function(){
          checkType(null, 'hello world');
      });
      assert.throws(function(){
        checkType(undefined, 'hello world');
      });
      assert.throws(function(){
          checkType(true, 'hello world');
      });
      assert.throws(function(){
          checkType(function(){}, 'hello world');
      });
  });
  it('returns true if 1st arg is optional and 2nd arg null', function()
  {
      assert(checkType('?string', null));
  });
  it('returns true if 1st arg is optional and 2nd arg undefined', function()
  {
      assert(checkType('?string', undefined));
  });
  it('returns true if the 2nd argument matches the 1st (prim types)', function(){
      assert(checkType('string', 'hello world'));
      assert(!checkType('string', 123));
      assert(!checkType('string', false));
      assert(!checkType('string', function(){}));
      assert(!checkType('string', {}));
      assert(!checkType('string', null));
      
      assert(checkType('number', 123));
      assert(!checkType('number', 'hello world'));
      assert(!checkType('number', false));
      assert(!checkType('number', function(){}));
      assert(!checkType('number', {}));
      assert(!checkType('number', null));
      
      assert(checkType('boolean', false));
      assert(!checkType('boolean', 'hello world'));
      assert(!checkType('boolean', 123));
      assert(!checkType('boolean', function(){}));
      assert(!checkType('boolean', {}));
      assert(!checkType('boolean', null));
      
      assert(checkType('function', function(){}));
      assert(!checkType('function', 'hello world'));
      assert(!checkType('function', 123));
      assert(!checkType('function', false));
      assert(!checkType('function', {}));
      assert(!checkType('function', null)); 
      
      assert(checkType('object', {}));
      assert(!checkType('object', 'hello world'));
      assert(!checkType('object', 123));
      assert(!checkType('object', false));
      assert(!checkType('object', function(){}));
      assert(!checkType('object', null)); 
  });
  it('returns true if the 2nd argument matches the 1st (duck types)', function(){
      var array = [];
      var promise = new Promise(function(){});
      var subscription = {subscribe:function(){}, unsubscribe:function(){}};
      var date = new Date();
      var regex = new RegExp("test");
      
      assert(checkType('array', array));
      assert(!checkType('array', promise));
      assert(!checkType('array', subscription));
      assert(!checkType('array', date));
      assert(!checkType('array', regex));
      
      assert(checkType('promise', promise));
      assert(!checkType('promise', array));
      assert(!checkType('promise', subscription));
      assert(!checkType('promise', date));
      assert(!checkType('promise', regex));
      
      assert(checkType('subscription', subscription));
      assert(!checkType('subscription', array));
      assert(!checkType('subscription', promise));
      assert(!checkType('subscription', date));
      assert(!checkType('subscription', regex));
      
      assert(checkType('date', date));
      assert(!checkType('date', array));
      assert(!checkType('date', promise));
      assert(!checkType('date', subscription));
      assert(!checkType('date', regex));
      
      assert(checkType('regex', regex));
      assert(!checkType('regex', array));
      assert(!checkType('regex', promise));
      assert(!checkType('regex', subscription));
      assert(!checkType('regex', date));
  });
  it('is not case sensitive', function()
  {
     assert(checkType('string', 'hello world'));
     assert(checkType('STRING', 'hello world'));     
  });
  it('matches with objects and nested types', function(){
      assert(checkType({
          "foo":"string",
          "bar":"number",
          "baz":{
              "qaz": "boolean"
          }
      }, {
          "foo":"hello",
          "bar":123,
          "baz":{
              "qaz": true
          }
      }));
      
    assert(!checkType({
          "foo":"string",
          "bar":"number",
          "baz":{
              "qaz": "boolean"
          }
      }, {
          "foo":"hello",
          "bar":123,
          "baz":{
              "qaz": function(){}
          }
      }));
  });
});

describe("assertType", function(){
   it("throws an exception if the type doesnt match", function(){
       assert.throws(function(){
           assertType("string", 123);
       });
   }); 
   it("doesnt throw an exception if the type does match", function(){
       assert.doesNotThrow(function(){
           assertType("string","hello");
       });
   });
});
