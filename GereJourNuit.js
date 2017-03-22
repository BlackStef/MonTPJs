/**
 * Created by Stef on 19/03/2017.
 */
/**
 * Created by stef on 10/03/17.
 */
const EventEmitter = require('events').EventEmitter;
class GereJourNuit {


  constructor() {

    this.InterGereCycle = setInterval(() => this.EmitEvent(), 1000);
    this.bJour;  //false : Nuit   True : Jour

    this.eventgerecyclejour = new EventEmitter();


  }

  EmitEvent(){
    this.bJour = ! this.bJour;
    if(this.bJour){
      this.eventgerecyclejour.emit('Jour');
    }
    else{
      this.eventgerecyclejour.emit('Nuit');
    }

  }
}


module.exports = {GereJourNuit};


