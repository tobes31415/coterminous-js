import assert from 'assert';
import {
  registerCapability
}
from '../src/coterminous.js';

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
}
describe('Coterminous', function() {
  it('registerCapability invalid capability', function() {
    assert.throws(() => {
      registerCapability({})
    }, 'Should have thrown');
  });

  it('registerCapability valid capability', function() {
    assert.doesNotThrow(() => {
      registerCapability(mockedCapability)
    }, 'Should not have thrown');
  });
});
