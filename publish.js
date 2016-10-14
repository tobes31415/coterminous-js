import Coterminous from './src/coterminous.js';
import * as handshaker from './src/handshaker.js';
import * as rootInterface from './src/rootInterface.js';
import * as functionPassing from './src/functionPassing.js';
import * as promisePassing from './src/promisePassing.js';
import * as datePassing from './src/datePassing.js';
import * as regexPassing from './src/regexPassing.js';
import * as undefinedPassing from './src/undefinedPassing.js';
import * as subscriptionPassing from './src/subscriptionPassing.js';
import * as externalDisposing from './src/externalDisposing.js';

import global from './src/global.js';
export default Coterminous;

try
{
    global.Coterminous = Coterminous;
}
catch(ignored){}