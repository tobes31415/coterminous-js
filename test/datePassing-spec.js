import assert from 'assert';
import Coterminous from '../publish.js';
import connect from './testConnection.js';
import logger from '../src/log.js';
import {assertType} from '../src/checkType.js';

describe('datePassing', function() { 
    it('ensure date serializes and deserializes', function(done){
      Coterminous.root({
        remote: new Date()
      });
      
      connect().then(function(remoteInterface) 
      {
          assertType({remote:"date"}, remoteInterface);
          done();
      });
    });
});
