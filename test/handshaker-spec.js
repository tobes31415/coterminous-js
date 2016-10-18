import assert from 'assert';
import {assertType} from '../src/checkType.js';

import Coterminous from '../publish.js';
import connect from './testConnection.js';


describe('handshaker', () => {
    it('ensure two sides capable of connecting', (done) => {
      Coterminous.root({
        hello: "world"
      });
      
      connect().then(function(remoteInterface) {
        assertType({"hello":"string"}, remoteInterface);
        done();
      });
    });
});
