var isBrowser = false;
try{isBrowser = window && window.console;}
catch(ignored){}
(isBrowser?window:global).enableCoterminusLogs = true;