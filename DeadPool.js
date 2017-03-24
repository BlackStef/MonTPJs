const chalk = require('chalk');
const BlueBirdPromise = require("bluebird");

let instanceDeadpool = null;
class DeadPool {
  constructor(myobjgerecycle) {
    if (!instanceDeadpool) {
      this.regInterDead = setInterval(() => this.regeneration(), 3000);
      this.InterCompte = setInterval(() => this.compteLicorne(), 4000);
      //   This.isRegenerate = false;
      this.compteUnicorn = 0;
      this.comptePoney = 0;
      this.poneys = [];
      //   This.gerecycle = myobjgerecycle;
      instanceDeadpool = this;

      myobjgerecycle.eventgerecyclejour.on('cycle change', period => {
        if (period === 'day') {
          console.log('Jour : Deadpool calme ses ardeurs');
          clearInterval(this.regInterDead);
          this.regInterDead = setInterval(() => this.regeneration(), 3000);
        } else if (period === 'night') {
          console.log('NUIT : Deadpool se lache');
          clearInterval(this.regInterDead);
          this.regInterDead = setInterval(() => this.regeneration(), 2000);
        }
      });
    }
    return instanceDeadpool;
  }
  addPoney(poney) {
    this.poneys.push(poney);
  }

  regeneration() {
    this.checkPoney()
      .then(() => {
        console.log(' ');
        console.log('REGEN DEADPOOL : ');
        console.log(' ');
        console.log('Regeneration Deadpool');
      })
      .catch(() => {
        console.log(' ');
        console.log('REGEN DEADPOOL : ');
        console.log(' ');
        console.log('Pas de regeneration');
      });
  }

  compteLicorne() {
    this.comptePoney = 0;
    this.compteUnicorn = 0;
    for (let iVal = 0; iVal < 5; iVal++) {
      if (this.poneys[iVal].isUnicorn) {
        console.log(chalk.green(`Number ${iVal} is an Unicorn`));
        this.compteUnicorn++;
      } else {
        console.log(chalk.green(`Number ${iVal} is a Poney, Energie : ${this.poneys[iVal].energy}`));
        this.comptePoney++;
      }
    }
    console.log(chalk.green(`Unicorns : ${this.compteUnicorn} Poney : ${this.comptePoney}`));
  }

  checkPoney() {
    return new BlueBirdPromise((resolve, reject) => {
      setTimeout(() => {
        const iNumPoney = Math.floor((Math.random() * 4) + 1);
        const bConard = (Math.floor((Math.random() * 100) + 1) >= 50);      // 1 chance sur 2 d'utiliser la licorne
        if (!this.poneys[iNumPoney].isUsed) {
          if (bConard) {
            this.poneys[iNumPoney].backPoney()
              .then(() => {
                console.log(`Licorn ${iNumPoney} to Poney ok`);
                this.isRegenerate = true;
                resolve();
              })
              .catch(() => {
                console.log(`Number ${iNumPoney} Already poney`);
                reject();
              });
          } else {
            console.log('Reste une licorne pour cette fois !');
            reject();
          }
        } else {
          console.log(`Number ${iNumPoney} already used by Spiderman`);
        }
      }, 100);
    });
  }

  makeEvolve(poney) {
    return new BlueBirdPromise((resolve, reject) => {
      setTimeout(() => {
        const ChanceEvolve = (this.compteUnicorn / this.comptePoney) * 100;  // Nombre entre 0 et 100 selon le rapport poney-licorne
        const bGentil = (Math.floor((Math.random() * 100) + 1) >= ChanceEvolve);      // Chance que Deadpool soit gentil et lance l'evolve
        if (!poney.isUsed) {
          if (bGentil) {
            resolve();
          } else {
            console.log(chalk.blue('Deadpool pas gentil'));
            console.log(chalk.blue('Pas de transformation'));
            reject();
          }
        } else {
          console.log(chalk.blue(`Number ${poney.indexPoney} already used`));
          reject();
        }
      }, 100);
    });
  }
}

module.exports = {DeadPool};

