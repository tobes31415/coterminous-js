import assert from 'assert';

import {
  registerCapability
}
from '../src/coterminous.js';

import * as Coterminous from '../src/coterminous.js';
import * as Loopback from 'coterminous-js-loopback';

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

    it('ensure root definition', () => {
      Coterminous.root({
        hello: function() {
          return "world";
        }
      });

      var transport = new Loopback();

      Coterminous.connect(transport).then(function(remoteInterface) {
        assert.equal(remoteInterface.hello(), 'world', 'Root remote interface should have been used');
      });
    });
  });


});
