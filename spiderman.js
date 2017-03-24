const chalk = require('chalk');

let instanceSpiderman = null;

class Spiderman {
  constructor(myobjgerecycle) {
    if (!instanceSpiderman) {
      this.regInterPlay = setInterval(() => this.checkPoney(), 1500);
      this.poneys = [];
      instanceSpiderman = this;
      myobjgerecycle.eventgerecyclejour.on('cycle change', period => {
        if (period === 'day') {
          console.log(chalk.red.bgYellow('Jour : Spiderman est plus joueur !'));
          clearInterval(this.regInterPlay);
          this.regInterPlay = setInterval(() => this.checkPoney(), 1000);
        } else if (period === 'night') {
          console.log(
            chalk.red.bgBlack('NUIT : Spiderman dort et est moins joueur'));
          clearInterval(this.regInterPlay);
          this.regInterPlay = setInterval(() => this.checkPoney(), 1500);
        }
      });
    }
    return instanceSpiderman;
  }

  addPoney(poney) {
    this.poneys.push(poney);
  }

  checkPoney() {
    const iNumPoney = Math.floor((Math.random() * 4) + 1);
    console.log(chalk.red('SPIDERMAN PLAY :'));
    console.log(' ');
    if (this.poneys[iNumPoney].isUsed) {
      console.log(
        chalk.red(`Number ${iNumPoney} already used by DeadPool`));
    } else {
      const bConard = (Math.floor((Math.random() * 100) + 1) >= 50);
      if (bConard) {
        this.poneys[iNumPoney].isUsed = true;
        this.poneys[iNumPoney].backPoney()
          .then(() => {
            console.log(chalk.red('SPIDERMAN joueur et epuise licorne'));
            console.log(chalk.red(`Licorn ${iNumPoney} to Poney ok`));
          })
          .catch(() => {
            console.log(chalk.red(`Number ${iNumPoney} Already poney`));
          })
          .finally(() => {
            this.poneys[iNumPoney].isUsed = false;
            console.log(chalk.red(`Fin du jeu de spiderman`));
          });
      } else if (this.poneys[iNumPoney].isUnicorn) {
        console.log(chalk.red(
          `Reste une licorne pour cette fois ! Numero : ${iNumPoney}`));
        console.log(chalk.red('SPIDERMAN pas joueur'));
      } else {
        console.log(chalk.red(`Number ${iNumPoney} Already poney`));
      }
    }
  }
}

module.exports = {Spiderman};
