import logger from './log.js';
import {registerCapability} from './coterminous.js';
import walkObject from './walkObject.js';
import {checkType} from './checkType.js';
import Deferred from './deferred.js';
import Subscription from './subscription.js';
import StrongMap from './strongMap.js';
import {dispose, registerDispose} from './manualDispose.js';
var log = logger("subscriptionPassing");
var subscriptionRefIdCount = 1;
var Capability = {
    "name":"subscriptionPassing",
    "version":"0.0.1",
    "needsChannel":true,
    "onReceive":function({Cache, Channel, Interface, Message})
    {
        if (Message.publish)
        {
            Cache.Connection.Remote[Message.publish].publish(... Message.args);
        }
        else if (Message.forget)
        {
            dispose(Cache.Connection.Remote[Message.forget]);
            delete Cache.Connection.Remote[Message.forget];
        }
    },
    "onConnect":function({Cache, Channel})
    {
        Cache.Connection.LocalReverse = new StrongMap();
        Cache.Connection.Remote = {};
        Cache.Connection.Channel = Channel;
    },
    "onSerialize":function({Message, Cache})
    {
        walkObject(Message, checkType.bind(null, "subscription"), function(subscription)
        {
            var id;
            if (!Cache.Connection.LocalReverse.has(subscription.subscribe))
            {
                id = subscriptionRefIdCount++;
                Cache.Connection.LocalReverse.set(subscription.subscribe,id);
                subscription.subscribe(sendPublish.bind(null, Cache, id));
                linkDisposeFunction(Cache, subscription.subscribe, id);
            }
            else
            {
                id = Cache.Connection.LocalReverse.get(subscription.subscribe);
            }
            return {"$subscription":id};
        });
    },
    "onDeserialize":function({Message, Cache})
    {
        walkObject(Message, checkType.bind(null, {"$subscription":"number"}), function(p)
        {
            if(!Cache.Connection.Remote[p.$subscription])
            {
                Cache.Connection.Remote[p.$subscription] = new Subscription();
            }
            return Cache.Connection.Remote[p.$subscription].readOnly;
        });
    }
}
registerCapability(Capability);

function linkDisposeFunction(Cache, subscription, subscriptionRef)
{
    registerDispose(subscription, function()
    {
        Cache.Connection.Channel.send({forget:subscriptionRef});
        delete Cache.Connection.Remote[subscriptionRef];
    });
}

function sendPublish(Cache, subscriptionRef, ...args)
{
    Cache.Connection.Channel.send({publish:subscriptionRef, args:args});
}

export default {};