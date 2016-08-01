import * as enableLoging from './src/enableLogging.js';

import logger from './src/log.js';
import {assertType} from './src/checkType.js';
import Coterminous from './src/coterminous.js';
import loopback from './src/loopback.js';
import * as handshaker from './src/handshaker.js';
import * as rootInterface from './src/rootInterface.js';
import * as functionPassing from './src/functionPassing.js';
import * as promisePassing from './src/promisePassing.js';
import * as datePassing from './src/datePassing.js';
import * as regexPassing from './src/regexPassing.js';

var log = logger("main.js");

var l = new loopback();

Coterminous.root({hello:"world",test:function(){return 123;}, echo:function(arg){return {echo:arg}}})

var myInterface = Coterminous.connectTransport(l.A);
var remoteInterface = Coterminous.connect(l.B);

remoteInterface.then(function(ri){
    window.ri = ri;
});
