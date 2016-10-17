import assert from 'assert'
import global from '../src/global.js';
import {assertType} from '../src/checkType.js';
import sinon from 'sinon';

describe('global', () => {
  it('is a non-null object', () => {
    assertType("object", global);
  });
});
