import assert from 'assert'
import cache from '../src/cache.js';
import {disposeRoot} from '../src/cache.js';
import {assertType} from '../src/checkType.js';
import {registerDispose} from '../src/manualDispose.js';
import sinon from 'sinon';

var Coterminous;
var Transport;
var Capability1;
var Capability2;
var spy;

describe('cache', () => {
  beforeEach(function(){
    Coterminous = {};
    Transport = {};
    Capability1 = {};
    Capability2 = {};      
    spy = sinon.spy();
  });
    
  it('is a function', () => {
    assertType("function", cache);
  });
  it('if specifying Coterminous returns an object with App', function()
  {
      assertType({
          "App":"object"
      }, cache({Coterminous, Capability: Capability1}));
  });
  it('if specifying Transport returns an object with Connection', function()
  {
      assertType({
          "Connection":"object"
      }, cache({Transport, Capability: Capability1}));
  });
  it('if specifying Coterminous and Transport returns an object with App & Connection', function()
  {
      assertType({
          "App":"object",
          "Connection":"object"
      }, cache({Coterminous, Transport, Capability: Capability1}));
  });
  it('App & Connection are different objects', function()
  {
      assert.notEqual(Coterminous, Transport);
      var caches = cache({Coterminous, Transport, Capability:Capability1});
      assert.notEqual(caches.App, caches.Connection);
  });
  it('When different capabilities specified you get different objects', function()
  {
      assert.notEqual(Capability1, Capability2);
      var caches1 = cache({Coterminous, Capability:Capability1});
      var caches2 = cache({Coterminous, Capability:Capability2});
      assert.notEqual(caches1.App, caches2.App);
  });
  it('Future calls return the same object', function(){
      var caches1 = cache({Coterminous, Capability:Capability1});
      var caches2 = cache({Coterminous, Capability:Capability1});
      assert.equal(caches1.App, caches2.App);
  });
  it('Disposing the root of a cache causes dispose to be chained to any values inside the cache', function(){
      var caches = cache({Coterminous, Capability:Capability1});
      var foo = {};
      caches.App.foo = foo;
      registerDispose(foo, spy);
      disposeRoot(Coterminous);
      assert(spy.called);
  });
});
