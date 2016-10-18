import {registerDispose} from '../src/manualDispose.js';
import Coterminous from '../publish.js';
import Loopback from '../bower_components/coterminous-js-loopback/bower/loopback.js';
import logger from '../src/log.js';
var log = new logger("testConnection");

export default function()
{     
   var transport = new Loopback();
   var disconnectA;
   var disconnectB;
   transport.A.disconnected.subscribe = function(cb){disconnectA = cb;}
   transport.B.disconnected.subscribe = function(cb){disconnectB = cb;}
   var result = Coterminous.connect(transport.A)
   Coterminous.connectTransport(transport.B);
   registerDispose(result, function(){
       try{disconnectA();}catch(err){log.error(err);log.error(err.stack);}
       try{disconnectB();}catch(err){log.error(err);log.error(err.stack);}
   });
   return result;
};
