import Sub from './queuingSubscription.js'

/*
 * This is a simple 2-sided transport to assist in testing and development
 */
export default class
{
    constructor(options)
    {
        var Asub = new Sub();
        var Bsub = new Sub();
        this.A = new LoopbackTransportSide(Asub, Bsub);
        this.B = new LoopbackTransportSide(Bsub, Asub);
    }
}

class LoopbackTransportSide
{   
    constructor(mine, other)
    {
        this.send = function(msg){mine.publish(JSON.parse(JSON.stringify(msg)));}
        this.receive = other        
        this.disconnect=function(){}        
        this.disconnected=new Sub();
    }
}

