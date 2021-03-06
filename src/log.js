import global from './global.js';

export default function logger(name)
{
    var prefix = `[${name}]`;
    
    var log;
    try
    {
        log = {
            debug: global.console.debug.bind(global.console, prefix),
            warn: global.console.warn.bind(global.console, prefix),
            error: global.console.error.bind(global.console, prefix),
            info: global.console.info.bind(global.console, prefix),
            trace: global.console.trace.bind(global.console, prefix)
        }
    }
    catch(ignored)
    {}
    if(!log)
    {
        log = {
            debug: console.log.bind(console, '[DEBUG]'+prefix),
            warn: console.log.bind(console, '[WARN]'+prefix),
            error: console.log.bind(console, '[ERROR]'+prefix),
            info: console.log.bind(console, '[INFO]'+prefix),
            trace: console.log.bind(console, '[TRACE]'+prefix),
        }
    }
    if (!global.enableCoterminusLogs)
    {
        log.debug = function(){};
        log.warn = log.debug;
        log.info = log.debug;
        log.trace = log.debug;
    }
    return log;
}