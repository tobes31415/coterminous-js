import assert from 'assert';
import Coterminous from '../publish.js';
import connect from './testConnection.js';
import logger from '../src/log.js';
import {assertType} from '../src/checkType.js';

describe('regexPassing', function() { 
    it('ensure regex serializes and deserializes', function(done){
      Coterminous.root({
        remote: /test/
      });
      
      connect().then(function(remoteInterface) 
      {
          assertType({remote:"regex"}, remoteInterface);
          done();
      });
    });
});
