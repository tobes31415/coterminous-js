import * as enableLoging from './src/enableLogging.js';

import logger from './src/log.js';
import
{
  assertType
}
from './src/checkType.js';
import Coterminous from './src/coterminous.js';
import * as handshaker from './src/handshaker.js';
import * as rootInterface from './src/rootInterface.js';
import * as functionPassing from './src/functionPassing.js';
import * as promisePassing from './src/promisePassing.js';
import * as datePassing from './src/datePassing.js';
import * as regexPassing from './src/regexPassing.js';
import * as undefinedPassing from './src/undefinedPassing.js';
import * as subscriptionPassing from './src/subscriptionPassing.js';
import * as loopback from './bower_components/coterminous-js-loopback/bower/loopback.js';
import * as externalGC from './src/externalGC.js';
import * as externalUtilities from './src/externalUtilities.js';
import deferred from './src/deferred.js';
import StrongMap from './src/strongMap.js';
import global from './src/global.js';
import subscription from './src/subscription.js';
import {registerDispose, dispose} from './src/manualDispose.js';

global.registerDispose = registerDispose;
global.dispose = dispose;
global.StrongMap = StrongMap;
global.deferred = deferred;
global.foo = function(){}
global.subscription = subscription;
global.Coterminous = Coterminous;

var log = logger("main.js");

var theRoot = {
  hello: "world",
  test: function()
  {
    return 123;
  },
  abc :{
    def:{
        ghi: function(){
            console.log("jkl");
        }
    }  
  },
  echo: function(...args)
  {
    return {
      echo: args
    };
  }
};
Coterminous.root(theRoot);
global.theRoot = theRoot;

var l = new Coterminous_Loopback();
l.A.disconnected.subscribe = function(cb){discba = cb;}
l.B.disconnected.subscribe = function(cb){discbb = cb;}
var myInterface = Coterminous.connectTransport(l.A);
var remoteInterface = Coterminous.connect(l.B);

remoteInterface.then(function(ri)
{
  global.ri = ri;
});
