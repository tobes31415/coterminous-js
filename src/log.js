export default function logger(name)
{
    var prefix = `[${name}]`;
    return {
        debug: window.console.debug.bind(window.console, prefix),
        warn: window.console.warn.bind(window.console, prefix),
        error: window.console.error.bind(window.console, prefix),
        info: window.console.info.bind(window.console, prefix),
        trace: window.console.trace.bind(window.console, prefix)
    }
}