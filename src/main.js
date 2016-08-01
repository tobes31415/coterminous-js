import * as enableLoging from './enableLogging.js';

import logger from './log.js';
import {assertType} from './checkType.js';
import Coterminous from './coterminous.js';
import loopback from './loopback.js';
import * as handshaker from './handshaker.js';
import * as rootInterface from './rootInterface.js';
import * as functionPassing from './functionPassing.js';
import * as promisePassing from './promisePassing.js';
import * as datePassing from './datePassing.js';

var log = logger("main.js");

var l = new loopback();

Coterminous.root({hello:"world",test:function(){return 123;}, echo:function(arg){return {echo:arg}}})

var myInterface = Coterminous.connectTransport(l.A);
var remoteInterface = Coterminous.connect(l.B);

remoteInterface.then(function(ri){
    window.ri = ri;
});
