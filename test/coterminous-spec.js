import assert from 'assert';

import {
  registerCapability
}
from '../src/coterminous.js';

import Coterminous from '../publish.js';

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
});
