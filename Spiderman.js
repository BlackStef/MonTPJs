const chalk = require('chalk');
const BlueBirdPromise = require("bluebird");

let instanceSpiderman = null;

class Spiderman {
  constructor(myponey, myobjgerecycle) {
    if (!instanceSpiderman) {
      this.regInterPlay = setInterval(() => this.playPoney(), 1500);
      this.poneys = myponey;
      instanceSpiderman = this;

      myobjgerecycle.eventgerecyclejour.on('cycle change', period => {
        if (period === 'day') {
          console.log(chalk.red('Jour : Spiderman est plus joueur !'));

          clearInterval(this.regInterPlay);
          this.regInterPlay = setInterval(() => this.playPoney(), 1000);     // 1000 ?
        } else if (period === 'night') {
          console.log(chalk.red('NUIT : Spiderman dort et est moins joueur'));
          clearInterval(this.regInterPlay);
          this.regInterPlay = setInterval(() => this.playPoney(), 2000);
        }
      });
    }
    return instanceSpiderman;
  }

  playPoney() {
    this.checkPoney()
      .then(() => {
        console.log(chalk.red('SPIDERMAN joueur et epuise licorne'));
      })
      .catch(() => {
        console.log(chalk.red('SPIDERMAN pas joueur'));
      });
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
                console.log(chalk.red(`Licorn ${iNumPoney} to Poney ok`));
                this.isRegenerate = true;
                resolve();
              })
              .catch(() => {
                console.log(chalk.red(`Number ${iNumPoney} Already poney`));
                reject();
              });
          } else {
            console.log(chalk.red(`Reste une licorne pour cette fois ! Numero : ${iNumPoney}`));
            reject();
          }
        } else {
          console.log(chalk.red(`Number ${iNumPoney} already used by DeadPool`));
        }
      }, 100);
    });
  }
}
module.exports = {Spiderman};
