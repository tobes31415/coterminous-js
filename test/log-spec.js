import assert from 'assert'
import logger from '../src/log.js';
import global from '../src/global.js';
import {assertType} from '../src/checkType.js';
import sinon from 'sinon';

var origConsole;
var spyConsole;
var origLogsEnabled;

describe('log', () => {
  beforeEach(function(){
      origConsole = global.console;
      assertType("object", origConsole);
      
      origLogsEnabled = global.enableCoterminusLogs;
      global.enableCoterminusLogs = true;
      
      spyConsole = {
          debug: sinon.spy(),
          warn: sinon.spy(),
          info: sinon.spy(),
          error: sinon.spy(),
          trace: sinon.spy()
      };
      
      global.console.debug = spyConsole.debug;
      global.console.warn = spyConsole.warn;
      global.console.info = spyConsole.info;
      global.console.error = spyConsole.error;
      global.console.trace = spyConsole.trace;

  });
  
  afterEach(function(){
      global.console.debug = origConsole.debug;
      global.console.warn = origConsole.warn;
      global.console.info = origConsole.info;
      global.console.error = origConsole.error;
      global.console.trace = origConsole.trace;
      
      global.enableCoterminusLogs = origLogsEnabled;
  });
  
  it('is a function', () => {
    assertType("function", logger);
  });
  it('returns an object with debug, error, info, warn, and trace', function()
  {
      var obj = new logger();
      assertType({
          "debug":"function",
          "error":"function",
          "info":"function",
          "warn":"function",
          "trace":"function"
      }, obj);
  });
  it('calling a log function calls the underlying log implementation', function()
  {
      var obj = new logger();
      obj.debug("foo");
      assert(spyConsole.debug.called);
  });
  it('prefixes applied to messages', function()
  {
      var obj = new logger("foo");
      obj.debug("bar");
      assert(spyConsole.debug.calledWith("[foo]","bar"));
  });
  it('<error messages not logged when !global.enableCoterminusLogs', function()
  {
      global.enableCoterminusLogs = false;
      var obj = new logger("foo");
      obj.debug("bar");
      obj.warn("bar");
      obj.info("bar");
      obj.trace("bar");
      assert(spyConsole.debug.notCalled);
      assert(spyConsole.warn.notCalled);
      assert(spyConsole.info.notCalled);
      assert(spyConsole.trace.notCalled);
  });
  it('error messages logged even when !global.enableCoterminusLogs', function(){
      global.enableCoterminusLogs = false;
      var obj = new logger("foo");
      obj.error("bar");
      assert(spyConsole.error.called);
  })
});
