import logger from './log.js';
import Subcription from './subscription.js'
var log = logger("Coterminus-channel");


export default class
{
    constructor({LocalChannelId, RemoteChannelId, Transport, Capability}){
        this.Transport = Transport;
        this.LocalChannelId = LocalChannelId;
        this.RemoteChannelId = RemoteChannelId;
        this.Capability = Capability;
        this.receive = new Subcription();
    }
    
    //sends a message, using the full stack to serialize it, returns a promise
    send(msg){
        log.debug("Sending ", msg, "on Remote Channel ", this.RemoteChannelId);
        this.Transport.send({c:this.RemoteChannelId, m:msg})
    }
}