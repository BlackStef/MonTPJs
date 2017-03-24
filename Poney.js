const chalk = require('chalk');
const {DeadPool} = require('./DeadPool');
const BlueBirdPromise = require("bluebird");

class Poney {
  constructor(myobjgerecycle) {
    this.regInter = setInterval(() => this.regeneration(), 1000);
    this.askInter = setInterval(() => this.askForEvolve(), 2000);
    this.energy = 0;
    this.vitesseregeneration = 10;
    this.isUnicorn = false;
    this.isUsed = false;

    this.dead = new DeadPool(myobjgerecycle);
    this.dead.addPoney(this);
    this.indexPoney = this.dead.poneys.length - 1;

    myobjgerecycle.eventgerecyclejour.on('cycle change', period => {
      if (period === 'day') {
        this.vitesseregeneration = 10;
      } else if (period === 'night') {
        this.vitesseregeneration = 20;
      }
    });
  }

  regeneration() {
    if ((this.energy <= 90) && !this.isUnicorn) {
      this.energy += this.vitesseregeneration;
    } else {
      this.energy = 100;
    }
    // Console.log(`Regeneration, Energy : ${this.energy}`);
  }

  KillPoney() {
    clearInterval(this.RegInter);
  }

  askForEvolve() {
    console.log(' ');
    console.log(chalk.blue(`Number ${this.indexPoney} Ask for UNICORN !`));
    console.log(' ');

    if (Math.floor((Math.random() * 100) + 1) <= this.energy) {
      if (!this.isUnicorn) {
        this.isUsed = true;
        this.dead.makeEvolve(this)
          .then(() => {
            console.log(chalk.blue(`Number ${this.indexPoney} evolving !`));
            this.isUnicorn = true;
          })
          .catch(() => {
            console.log(chalk.blue(`Number ${this.indexPoney} failed !`));
          })
          .finally(() => {
            this.energy = 0;
            this.isUsed = false;
          });
      } else {
        console.log(chalk.blue(`Number ${this.indexPoney} already an unicorn !`));
      }
    } else {
      console.log(chalk.blue(`Energie du poney ${this.indexPoney} : ${this.energy} `));
      console.log(chalk.blue(`Echec de l'evolution, energie trop faible`));
    }
  }

  backPoney() {                    // Retransforme les licornes en poney
    return new BlueBirdPromise((resolve, reject) => {
      this.isUsed = true;
      setTimeout(() => {
        if (this.isUnicorn) {
          resolve();
          this.energy = 0;
        } else {
          reject();
        }
      }, 100);
      this.isUsed = false;
    });
  }
}

module.exports = {Poney};

// SetTimeout(() => MyPoney.killPoney(), 10000);

