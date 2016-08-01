import Sub from './repeatingSubscription.js'

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
        this.send = mine.publish
        this.receive = other        
        this.disconnect=function(){}        
        this.disconnected=new Sub();
    }
}

