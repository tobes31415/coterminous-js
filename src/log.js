export default function logger(name)
{
    var prefix = `[${name}]`;
    
    var isBrowser = false;
    try{isBrowser = window && window.console;}
    catch(ignored){}

    if (isBrowser)
    {
        return {
            debug: window.console.debug.bind(window.console, prefix),
            warn: window.console.warn.bind(window.console, prefix),
            error: window.console.error.bind(window.console, prefix),
            info: window.console.info.bind(window.console, prefix),
            trace: window.console.trace.bind(window.console, prefix)
        }
    }
    else
    {
        return {
            debug: console.log.bind(console, '[DEBUG]'+prefix),
            warn: console.log.bind(console, '[WARN]'+prefix),
            error: console.log.bind(console, '[ERROR]'+prefix),
            info: console.log.bind(console, '[INFO]'+prefix),
            trace: console.log.bind(console, '[TRACE]'+prefix),
        }
    }
}