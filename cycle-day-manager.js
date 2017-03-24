const EventEmitter = require('events').EventEmitter;

class CycleDayManager {

  constructor() {
    this.InterGereCycle = setInterval(() => this.emitEvent(), 4000);
    this.bJour = true;  // False : Nuit   True : Jour
    this.eventgerecyclejour = new EventEmitter();
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

module.exports = {CycleDayManager};

