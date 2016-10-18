import logger from './log.js';
import {registerCapability} from './coterminous.js';
import {checkType, assertType} from './checkType.js';
import Deferred from './deferred.js';
import once from './once.js';
import StrongMap from './strongMap.js';
import Subscription from './subscription.js';
import walkObject from './walkObject.js';

var log = logger("external disposing");

var Capability = {
    "name":"externalUtilities",
    "version":"0.0.1",
    "localOnly":true,
    "onRegister":function({Coterminous})
    {
        Coterminous.util = {
            once: once,
            checkType: checkType,
            assertType: assertType,
            Deferred: Deferred,
            logger: logger,
            StrongMap:StrongMap,
            Subscription:Subscription,
            walkObject:walkObject
        };
    }
}

registerCapability(Capability);