/**
 * Created by Stef on 20/03/2017.
 */
const {Poney} = require('./Poney');
const {Spiderman} = require('./Spiderman');
const {DeadPool} = require('./DeadPool');
const {GereJourNuit} = require('./GereJourNuit');



const gerecycle = new GereJourNuit();
const TabPoney = [];
for (var iVal = 0; iVal < 5; iVal++) {

  TabPoney.push(new Poney(gerecycle));
}
const myDeadpool = new DeadPool(TabPoney,gerecycle);
const mySpiderman = new Spiderman(TabPoney,gerecycle);
