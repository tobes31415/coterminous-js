import logger from './log.js';
import {registerCapability} from './coterminous.js';
import walkObject from './walkObject.js';
import {checkType} from './checkType.js';
import Deferred from './deferred.js';
import Subscription from './subscription.js';
import StrongMap from './strongMap.js';
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
            if (!Cache.Connection.LocalReverse.has(subscription))
            {
                id = subscriptionRefIdCount++;
                Cache.Connection.LocalReverse.set(subscription,id);
                subscription.subscribe(sendPublish.bind(null, Cache, id));
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

function sendPublish(Cache, subscriptionRef, ...args)
{
    Cache.Connection.Channel.send({publish:subscriptionRef, args:args});
}

export default {};