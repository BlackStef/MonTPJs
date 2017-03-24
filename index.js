const {Poney} = require('./poney');
const {CycleDayManager} = require('./cycle-day-manager');

const cycleManager = new CycleDayManager();
const tabPoney = [];
for (let iVal = 0; iVal < 5; iVal++) {
  tabPoney.push(new Poney(cycleManager));
}

