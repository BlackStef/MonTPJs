const {Poney} = require('./Poney');
const {Spiderman} = require('./Spiderman');
const {DeadPool} = require('./DeadPool');
const {CycleDayManager} = require('./CycleDayManager');

const cycleManager = new CycleDayManager();
const tabPoney = [];

for (let iVal = 0; iVal < 5; iVal++) {
  tabPoney.push(new Poney(cycleManager));
}
const myDeadpool = new DeadPool(cycleManager);
const mySpiderman = new Spiderman(myDeadpool.poneys, cycleManager);
