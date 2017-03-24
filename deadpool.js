const chalk = require('chalk');
const BlueBirdPromise = require('bluebird');

let instanceDeadpool = null;
class DeadPool {
  constructor(myobjgerecycle) {
    if (!instanceDeadpool) {
      this.regInterDead = setInterval(() => this.checkPoneyForRegen(), 3000);
      this.InterCompte = setInterval(() => this.compteLicorne(), 4000);
      //   This.isRegenerate = false;
      this.compteUnicorn = 0;
      this.comptePoney = 0;
      this.poneys = [];
      //   This.gerecycle = myobjgerecycle;
      instanceDeadpool = this;

      myobjgerecycle.eventgerecyclejour.on('cycle change', period => {
        if (period === 'day') {
          console.log(
            chalk.black.bgYellow('Jour : Deadpool calme ses ardeurs'));
          clearInterval(this.regInterDead);
          this.regInterDead =
            setInterval(() => this.checkPoneyForRegen(), 3000);
        } else if (period === 'night') {
          console.log(chalk.white.bgBlack('NUIT : Deadpool se lache'));
          clearInterval(this.regInterDead);
          this.regInterDead =
            setInterval(() => this.checkPoneyForRegen(), 2000);
        }
      });
    }
    return instanceDeadpool;
  }

  addPoney(poney) {
    this.poneys.push(poney);
  }

  compteLicorne() {
    this.comptePoney = 0;
    this.compteUnicorn = 0;
    for (let iVal = 0; iVal < 5; iVal++) {
      if (this.poneys[iVal].isUnicorn) {
        console.log(chalk.green(`Number ${iVal} is an Unicorn`));
        this.compteUnicorn++;
      } else {
        console.log(chalk.green(
          `Number ${iVal} is a Poney, Energie : ${this.poneys[iVal].energy}`));
        this.comptePoney++;
      }
    }
    console.log(chalk.green(
      `Unicorns : ${this.compteUnicorn} Poney : ${this.comptePoney}`));
  }

  checkPoneyForRegen() {
    console.log('REGENERATION DEADPOOL : ');
    console.log(' ');
    const iNumPoney = Math.floor((Math.random() * 4) + 1);
    if (this.poneys[iNumPoney].isUsed) {
      console.log(
        chalk.white(`Number ${iNumPoney} already used by Spiderman`));
      console.log(chalk.white(`Regeneration failed`));
    } else {
      const bConard = (Math.floor((Math.random() * 100) + 1) >= 50);
      if (bConard) {
        this.poneys[iNumPoney].isUsed = true;
        this.poneys[iNumPoney].backPoney()
          .then(() => {
            console.log(chalk.white('DEADPOOL est un conard : REGENERATION'));
            console.log(chalk.white(`Licorn ${iNumPoney} to Poney ok`));
          })
          .catch(() => {
            console.log(chalk.white(`Number ${iNumPoney} Already poney`));
            console.log(chalk.white(`Regeneration failed`));
          })
          .finally(() => {
            this.poneys[iNumPoney].isUsed = false;
          });
      } else {
        console.log(chalk.white(
          `DEADPOOL n'est pas un conard, je te laisse pour cette fois ` +
          `Numero : ${iNumPoney}`));
      }
    }
  }

  makeEvolve(poney) {
    return new BlueBirdPromise((resolve, reject) => {
      setTimeout(() => {
        let chanceEvolve = 100;
        if (this.compteUnicorn > 0) {
          chanceEvolve = (this.comptePoney / (this.compteUnicorn)) * 100;
        }
        const bGentil = (Math.floor((Math.random() * 100) + 1) <= chanceEvolve);
        if (poney.isUsed) {
          console.log(chalk.blue(`Number ${poney.indexPoney} already used`));
          reject();
        } else if (bGentil) {
          console.log(chalk.blue(`DEADPOOL de bonne humeur`));
          resolve();
        } else {
          console.log(chalk.blue('DEADPOOL pas gentil'));
          console.log(chalk.blue('Pas de transformation'));
          reject();
        }
      }, 100);
    });
  }
}

module.exports = {DeadPool};

