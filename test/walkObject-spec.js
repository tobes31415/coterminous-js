import assert from 'assert'
import walkObject from '../src/walkObject.js';

describe('walkObject', () => {
  var obj = {
    prop: 'value'
  };

  var condition = (value) => {
    return value;
  };

  var onFind = (found) => {
    return found
  };

  var empty = () => {};

  it('obj found', () => {
    walkObject(obj, empty, empty);
  });
});
