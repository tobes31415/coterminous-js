import assert from 'assert';

import Coterminous from '../publish.js';
import connect from './testConnection.js';


describe('rootInterface', () => {
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
      
      connect().then(function(remoteInterface) {
        assert.equal(typeof remoteInterface.hello, 'function', 'Root remote interface was not passed correctly');
        done();
      });
    });
});
