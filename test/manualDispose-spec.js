import assert from 'assert'
import {disposeRoot} from '../src/cache.js';
import {assertType} from '../src/checkType.js';
import {registerDispose, assertNotDisposed, isDisposed, registerDisposeChain, disposable, dispose} from '../src/manualDispose.js';
import sinon from 'sinon';

var foo;
var spy;

describe('manualDispose', function() {
    beforeEach(function(){
        foo = {};
        spy = sinon.spy();
    });
    describe('dispose', function(){
      it('is a function', function() {
        assertType("function", dispose);
      });      
    });
    describe('registerDispose', function(){
      it('is a function', function() {
        assertType("function", registerDispose);
      });
      it('reisters a function that will be called when the object is disposed', function(){
          registerDispose(foo, spy);
          dispose(foo);
          assert(spy.called);
      });
      it('Accepts objects and functions', function(){
          registerDispose({}, spy);
          registerDispose(function(){}, spy);
      });
      it('throws and exception if you try to register on a primitives', function(){
          assert.throws(function(){
            registerDispose(123, spy);    
          });
          assert.throws(function(){
            registerDispose(true, spy);    
          });
          assert.throws(function(){
            registerDispose("hello", spy);    
          });
      });
      it('throws and exception if you try to register on null or undefined', function(){
          assert.throws(function(){
            registerDispose(null, spy);    
          });
          assert.throws(function(){
            registerDispose(undefined, spy);    
          });
      });
      it('accepts a function as the callback', function(){
        assertType("function", spy);
        registerDispose(foo, spy); 
      });
      it('throws and exception if you try to specify an object as the callback', function(){
          assert.throws(function(){
            registerDispose(foo, {});    
          });
      });
      it('throws and exception if you try to specify a primitives as the callback', function(){
          assert.throws(function(){
            registerDispose(foo, 123);    
          });
          assert.throws(function(){
            registerDispose(foo, true);    
          });
          assert.throws(function(){
            registerDispose(foo, "hello");    
          });
      });
      it('throws and exception if you try to specify null or undefined as the callback', function(){
          assert.throws(function(){
            registerDispose(foo, null);    
          });
          assert.throws(function(){
            registerDispose(foo, undefined);    
          });
      });
      it('Only calls your callback once, even if dispose is called more than once', function(){
          registerDispose(foo, spy);
          dispose(foo);
          dispose(foo);
          assert(spy.calledOnce); 
      });
      it('throws an exception if you try to register a new dispose handler on an object thats already disposed', function(){
          assert.throws(function(){
              registerDispose(foo, spy);
              dispose(foo);
              registerDispose(foo, spy);
          }); 
      }); 
    });
    describe('assertNotDisposed', function(){
      it('is a function', function() {
        assertType("function", assertNotDisposed);
      });
      it('throws if the object has been disposed', function() {
        assert.throws(function(){
            dispose(foo);
            assertNotDisposed(foo);
        });
      });
      it('does not throw if the object has not been disposed', function() {
        assertNotDisposed(foo);
      });       
    });
    describe('isDisposed', function(){
      it('is a function', function() {
        assertType("function", isDisposed);
      });
      it('returns true if the object has been disposed', function(){
          dispose(foo);
          assert(isDisposed(foo));
      });
      it('returns false if the object has not been disposed', function(){
          assert(!isDisposed(foo));
      });
    });
    describe('registerDisposeChain', function(){
      it('is a function', function() {
        assertType("function", registerDisposeChain);
      });
      it('when dispose is called on objectA, then objectB is also disposed', function(){
          var bar = {};
          registerDisposeChain(foo, bar);
          dispose(foo);
          assert(isDisposed(bar));
      });      
    });
    describe('disposable', function(){
        it('is a function', function() {
            assertType("function", disposable);
        });
        it('invoking the proxy invokes the underlying function', function(){
            disposable(spy)();
            assert(spy.called);
        });
        it('Invoking the proxy will throw an error if it has been disposed', function(){
            assert.throws(function(){
                var proxy = disposable(spy);
                dispose(proxy);
                proxy();
            });
        });
        it('the underlying function is not disposed when the proxy is disposed', function(){
            var proxy = disposable(spy);
            dispose(proxy);
            assertNotDisposed(spy);
        }); 
    });
});
