import assert from 'assert';

import {
  registerCapability
}
from '../src/coterminous.js';

import Coterminous from '../publish.js';
import Loopback from '../bower_components/coterminous-js-loopback/bower/loopback.js';

var mockedCapability = {
  "name": "mocked",
  "version": "0.0.1",
  "needsChannel": false,
  "onSerialize": function({
    Message,
    Cache
  }) {},
  "onDeserialize": function({
    Message,
    Cache
  }) {}
};

describe('Coterminous', () => {

  describe('registerCapability', () => {

    it('invalid capability', () => {
      assert.throws(() => {
        registerCapability({})
      }, 'Should have thrown');
    });

    it('valid capability', () => {
      assert.doesNotThrow(() => {
        registerCapability(mockedCapability)
      }, 'Should not have thrown');
    });

  });

  describe('connect test', () => {
    it('ensure able to define root', () => {
      Coterminous.root({
        hello: function() {
          return "world";
        }
      });
    });
    it('ensure root definition available from other side', (done) => {
      Coterminous.root({
        hello: function() {
          return "world";
        }
      });
      
      var transport = new Loopback();

      Coterminous.connect(transport.A).then(function(remoteInterface) {
        assert.equal(typeof remoteInterface.hello, 'function', 'Root remote interface was not passed correctly');
        done();
      });
      Coterminous.connectTransport(transport.B);
    });
  });


});
