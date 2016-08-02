importScripts('bower_components/coterminous-js/bower/coterminous.js');
importScripts('bower_components/coterminous-js-messageport/bower/messageport.js');

importScripts('subscription.js');

var messagesSubscription = new Subscription();
Coterminous.root({
    messages: messagesSubscription,
    send: messagesSubscription.publish
});

onconnect = function(e) {
    Coterminous.connectTransport(new Coterminous_MessagePort(e.ports[0]));
}
