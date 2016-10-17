import {registerDisposeChain} from '../src/manualDispose.js';
import Coterminous from '../publish.js';
import Loopback from '../bower_components/coterminous-js-loopback/bower/loopback.js';
import logger from '../src/log.js';
var log = new logger("testConnection");

export default function()
{     
   var transport = new Loopback();
   var result = Coterminous.connect(transport.A)
   Coterminous.connectTransport(transport.B);
   registerDisposeChain(result, transport);
   return result;
};
