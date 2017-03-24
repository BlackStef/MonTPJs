/**
 * Created by stef on 10/03/17.
 */
const {Poney} = require('./Poney');
const {Spiderman} = require('./Spiderman');
const {GereJourNuit} = require('./GereJourNuit');
const EventEmitter = require('events').EventEmitter;

let InstanceDeadpool = null;
class DeadPool {
  constructor(MyTabPoney, myobjgerecycle) {
    if(!InstanceDeadpool) {
      this.regInterDead = setInterval(() => this.regeneration(), 3000);
      this.transInter = setInterval(() => this.makeUnicorn(), 2000);
      this.InterCompte = setInterval(() => this.compteLicorne(), 4000);
      this.isRegenerate = false;
      this.compteUnicorn = 0;
      this.comptePoney = 0;
      this.poneys = MyTabPoney;
      this.gerecycle = myobjgerecycle;
      InstanceDeadpool = this;
    }


    this.gerecycle.eventgerecyclejour.on('Jour', function(){
      console.log('Jour : Deadpool calme ses ardeurs',colors.Reset);
      clearInterval(this.regInterDead);
      this.regInterDead = setInterval(() => this.regeneration(),3000);
    });

    this.gerecycle.eventgerecyclejour.on('Nuit', function(){
      console.log('NUIT : Deadpool se lache',colors.Reset);
      clearInterval(this.regInterDead);
      this.regInterDead = setInterval(() => this.regeneration(),2000);
    });
  }

  makeUnicorn(){

    this.makeEvolve()
      .then(() =>  {
        console.log(' ');
        console.log(colors.fg.Blue,` Make UNICORN !`,colors.Reset);
        console.log(' ');
        console.log(colors.fg.Blue,'Evolve ok !',colors.Reset);
      })
      .catch(() => {
        console.log(' ');
        console.log(colors.fg.Blue,` Make UNICORN !`,colors.Reset);
        console.log(' ');
        console.log(colors.fg.Blue,'error evolve',colors.Reset);
      })
  }

  regeneration(){
    this.checkPoney()
      .then(() => {
        console.log(' ');
        console.log('REGEN DEADPOOL : ',colors.Reset);
        console.log(' ');
        console.log('Regeneration Deadpool',colors.Reset);
      })
      .catch(() => {
        console.log(' ');
        console.log('REGEN DEADPOOL : ',colors.Reset);
        console.log(' ');
        console.log('Pas de regeneration',colors.Reset);
      })
  }
  compteLicorne(){
    for (var iVal = 0; iVal < 5; iVal++) {

      if(this.poneys[iVal].isUnicorn){
        console.log(colors.fg.Green,`Number ${iVal} is an Unicorn`);
        this.compteUnicorn++;
      }
      else {
        console.log(colors.fg.Green,`Number ${iVal} is a Poney, Energie : ${this.poneys[iVal].energy}`);
        this.comptePoney++;
      }
    }
    console.log(colors.fg.Green,`Unicorns : ${this.compteUnicorn} Poney : ${this.comptePoney}`);
  }

  checkPoney() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var iNumPoney = Math.floor((Math.random() * 4) + 1);
        var bConard = (Math.floor((Math.random() * 100) + 1) >= 50);      // 1 chance sur 2 d'utiliser la licorne
         if(!this.poneys[iNumPoney].isUsed) {
           if (bConard) {
             this.poneys[iNumPoney].backPoney()
               .then(() => {
                 console.log(`Licorn ${iNumPoney} to Poney ok`, colors.Reset);
                 this.isRegenerate = true;
                 resolve();
               })
               .catch(() => {
                 console.log(`Number ${iNumPoney} Already poney`, colors.Reset);
                 reject();
               })
           }
           else {
             console.log('Reste une licorne pour cette fois !', colors.Reset);
             reject();
           }
         }
         else{
           console.log(`Number ${iNumPoney} already used by Spiderman`, colors.Reset);
         }
      }, 100);
    });
  }


  makeEvolve() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var ChanceEvolve = (this.compteUnicorn/this.comptePoney) * 100;  //Nombre entre 0 et 100 selon le rapport poney-licorne
        var iNumPoney = Math.floor((Math.random() * 4) + 1);
        var bGentil = (Math.floor((Math.random() * 100) + 1) >= ChanceEvolve);      // chance que Deadpool soit gentil et lance l'evolbe
        var bTestEnergy = (Math.floor((Math.random() * 10) + 1) <= this.poneys[iNumPoney].energy);   //Chance que l'evolve se passe selon l'energie de la licorne (100 = 100%, 80 = 80% etc..)
        if(!this.poneys[iNumPoney].isUsed) {
          if (bGentil) {
            if (bTestEnergy) {
              this.poneys[iNumPoney].evolve()
                .then(() => {
                  console.log(colors.fg.Blue, `TRANSFORMATION du poney ${iNumPoney} en licorne ! `, colors.Reset);
                  resolve();
                })
                .catch(() => {
                  console.log(colors.fg.Blue, `evolution du poney ${iNumPoney} impossible`, colors.Reset);
                  reject();
                })
            }
            else {
              console.log(colors.fg.Blue, `Energie du poney ${iNumPoney} : ${this.poneys[iNumPoney].energy}) `, colors.Reset);
              console.log(colors.fg.Blue, `Echec de l'evolution, energie trop faible`, colors.Reset);
            }
          }
          else {
            console.log(colors.fg.Blue, 'Deadpool pas gentil', colors.Reset);
            console.log(colors.fg.Blue, 'Pas de transformation', colors.Reset);
            reject();
          }
        }
        else{
            console.log(`Number ${iNumPoney} already used by Spiderman`, colors.Reset);
        }
      }, 100);
    });
  }
}
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