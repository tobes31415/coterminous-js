import logger from './log.js';
import {registerCapability} from './coterminous.js';
import * as GC from './manualDispose.js';
var log = logger("external disposing");

var Capability = {
    "name":"externalDisposing",
    "version":"0.0.1",
    "needsChannel":false,
    "onRegister":function({Coterminous})
    {
        Coterminous.GC = GC;
    }
}

registerCapability(Capability);