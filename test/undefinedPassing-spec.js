import assert from 'assert';
import Coterminous from '../publish.js';
import connect from './testConnection.js';
import logger from '../src/log.js';
import {assertType} from '../src/checkType.js';

describe('undefinedPassing', function() { 
    it('ensure undefined serializes and deserializes', function(done){
      Coterminous.root({
        remote: undefined
      });
      
      connect().then(function(remoteInterface) 
      {
          assertType({remote:"undefined"}, remoteInterface);
          done();
      });
    });
});
