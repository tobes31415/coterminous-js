import * as enableLoging from './enableLogging.js';

import * as cycle from './lib/cycle.js';
import logger from './log.js';
import {assertType} from './checkType.js';
import Coterminous from './coterminous.js';
import loopback from './loopback.js';
import * as handshaker from './handshaker.js';
import * as rootInterface from './rootInterface.js';

var log = logger("main.js");

var l = new loopback();

var myInterface = Coterminous.createInterface();
myInterface.root({hello:"world",test:function(){return 123;}})

myInterface.connect(l.A);

var remoteInterface = Coterminous.connect(l.B);

remoteInterface.then(function(ri){
    log.debug(ri.hello);
});