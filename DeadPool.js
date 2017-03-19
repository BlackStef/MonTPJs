/**
 * Created by stef on 10/03/17.
 */


const {Poney} = require('./Poney');
const {Spiderman} = require('./Spiderman');

class DeadPool {


  constructor() {

    this.regInterDead = setInterval(() => this.regeneration(),3000);
    this.transInter = setInterval(() => this.makeUnicorn(), 2000 );
    this.InterCompte = setInterval(() => this.compteLicorne(), 4000 );
    this.isRegenerate = false;
    this.poneys = [];

    for (var iVal = 0; iVal < 5; iVal++) {

      this.poneys.push(new Poney())
    }


  }
  makeUnicorn(){

  console.log(' ');
  console.log(colors.fg.Blue,` Make UNICORN !`,colors.Reset);
  console.log(' ');
    this.makeEvolve()
    //  .then(() =>  console.log(' '))
    //  .then(() =>  console.log('Make UNICORN !'))
    //  .then(() =>  console.log(' '))
      .then(() =>  console.log(colors.fg.Blue,'Evolve ok !',colors.Reset))
    //  .catch(() =>  console.log(' '))
    //  .catch(() =>  console.log('Make UNICORN !'))
    //  .catch(() =>  console.log(' '))
      .catch(() => console.log(colors.fg.Blue,'error evolve',colors.Reset));
  }

  regeneration(){

    console.log(' ');
    console.log('REGEN DEADPOOL : ',colors.Reset);
    console.log(' ');
    this.checkPoney()

     // .then(() => console.log(' '))
      //.then(() => console.log('REGEN DEADPOOL :'))
      //.then(() => console.log(' '))
      .then(() => console.log('Regeneration Deadpool',colors.Reset))
      //.catch(() => console.log(' '))
      //.catch(() => console.log('REGEN DEADPOOL :'))
      //.catch(() => console.log(' '))
      .catch(() => console.log('Pas de regeneration',colors.Reset))
  }


  compteLicorne(){

    var CompteUnicorn = 0;
    var ComptePoney = 0;
    for (var iVal = 0; iVal < 5; iVal++) {

      if(this.poneys[iVal].isUnicorn){
        console.log(colors.fg.Green,`Number ${iVal} is an Unicorn`);
        CompteUnicorn++;
      }
      else {
        console.log(colors.fg.Green,`Number ${iVal} is a Poney, Energie : ${this.poneys[iVal].energy}`);
        ComptePoney++;
      }
    }
    console.log(colors.fg.Green,`Unicorns : ${CompteUnicorn} Poney : ${ComptePoney}`);
  }
  checkPoney() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var iNumPoney = Math.floor((Math.random() * 4) + 1);
        var bConard = (Math.floor((Math.random() * 100) + 1) >= 50);      // 1 chance sur 2 d'utiliser la licorne
         if (bConard){
          this.poneys[iNumPoney].backPoney()
            .then(() =>  console.log(`Licorn ${iNumPoney} to Poney ok`,colors.Reset))
            .then(() => this.isRegenerate = true)
            .then(() =>  resolve())
            .catch(() => console.log(`Number ${iNumPoney} Already poney`,colors.Reset))
            .catch(() =>  reject());
         }

        else{
          console.log('Reste une licorne pour cette fois !',colors.Reset);
          reject();
        }
      }, 100);
    });
  }


  makeEvolve() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var iNumPoney = Math.floor((Math.random() * 4) + 1);
        var bGentil = (Math.floor((Math.random() * 1) + 1) >= 1);      // 1 chance sur 2 de la faire evoluer
        if(bGentil) {
          this.poneys[iNumPoney].evolve()
            .then(() =>  console.log(colors.fg.Blue,`TRANSFORMATION : ${iNumPoney}! `,colors.Reset))
            .then(() =>  resolve())
            .catch(() => console.log(colors.fg.Blue,`volution impossible : ${iNumPoney} `,colors.Reset))
            .catch(() => reject());


        }
        else {
          console.log(colors.fg.Blue,'Pas gentil',colors.Reset);
          reject();
        }


      }, 100);
    });


  }
}

const myDeadpool = new DeadPool();
const mySpiderman = new Spiderman(myDeadpool.poneys);
module.exports = {DeadPool};


const colors = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  fg: {
    Black: "\x1b[30m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",
    Crimson: "\x1b[38m" //القرمزي
  },
  bg: {
    Black: "\x1b[40m",
    Red: "\x1b[41m",
    Green: "\x1b[42m",
    Yellow: "\x1b[43m",
    Blue: "\x1b[44m",
    Magenta: "\x1b[45m",
    Cyan: "\x1b[46m",
    White: "\x1b[47m",
    Crimson: "\x1b[48m"
  }
};