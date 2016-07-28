import * as cycle from './lib/cycle.js';
import logger from './log.js';
import {assertType} from './checkType.js';
import Coterminous from './coterminous.js';
import loopback from './loopback.js';
import * as handshaker from './handshaker.js';

var log = logger("main.js");

var l = new loopback();

l.A.receive.subscribe(function(obj){log.debug("A received", obj)});
l.B.receive.subscribe(function(obj){log.debug("B received", obj)});

l.A.send("hello");
l.B.send("world");

Coterminous.assertTransport(l.A);
