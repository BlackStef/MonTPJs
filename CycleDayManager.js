const eventEmitter = require('events').EventEmitter;

class GereJourNuit {

  constructor() {
    this.InterGereCycle = setInterval(() => this.emitEvent(), 1000);
    this.bJour;  // False : Nuit   True : Jour
    this.eventgerecyclejour = new eventEmitter();
  }

  emitEvent() {
    this.bJour = !this.bJour;
    if (this.bJour) {
      this.eventgerecyclejour.emit('cycle change', 'day');
    } else {
      this.eventgerecyclejour.emit('cycle change', 'night');
    }
  }
}

module.exports = {GereJourNuit};

