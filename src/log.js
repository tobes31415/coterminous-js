export default function logger(name)
{
    var prefix = `[${name}]`;
    
    var isBrowser = false;
    try{isBrowser = window && window.console;}
    catch(ignored){}

    var log;
    if (isBrowser)
    {
        log = {
            debug: window.console.debug.bind(window.console, prefix),
            warn: window.console.warn.bind(window.console, prefix),
            error: window.console.error.bind(window.console, prefix),
            info: window.console.info.bind(window.console, prefix),
            trace: window.console.trace.bind(window.console, prefix)
        }
    }
    else
    {
        log = {
            debug: console.log.bind(console, '[DEBUG]'+prefix),
            warn: console.log.bind(console, '[WARN]'+prefix),
            error: console.log.bind(console, '[ERROR]'+prefix),
            info: console.log.bind(console, '[INFO]'+prefix),
            trace: console.log.bind(console, '[TRACE]'+prefix),
        }
    }
    if (isBrowser && !window.enableCoterminusLogs || !global.enableCoterminusLogs)
    {
        log.debug = function(){};
        log.warn = log.debug;
        log.info = log.debug;
        log.trace = log.debug;
    }
    return log;
}