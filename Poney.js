/**
 * Created by stef on 10/03/17.
 */



class Poney {
  constructor(myobjgerecycle) {
    this.regInter = setInterval(() => this.Regeneration(), 1000);

    this.energy = 0;
    this.vitesseregeneration = 10;
    this.isUnicorn = false;

    this.isUsed = false;
    this.gerecycle = myobjgerecycle;
    this.gerecycle.eventgerecyclejour.on('Jour', function(){
      this.vitesseregeneration = 10;
    });

    this.gerecycle.eventgerecyclejour.on('Nuit', function(){
      this.vitesseregeneration = 20;
    });



  }

  Regeneration() {


    if ((this.energy <= 90) && !this.isUnicorn) {
      this.energy += this.vitesseregeneration;
    }
    else{
      this.energy = 100;
    }
   // console.log(`Regeneration, Energy : ${this.energy}`);
  }

  KillPoney() {
    clearInterval(this.RegInter);
  }

  evolve() {
    return new Promise((resolve, reject) => {
      this.isUsed = true;
      setTimeout(() => {
        if (!this.isUnicorn) {
          resolve();
          this.energy = 0;
          this.isUnicorn = true;
        }
        else {
          reject();
          console.log(colors.fg.Blue,'Already an unicorn',colors.Reset);
        }
      }, 100);
      this.isUsed = false;
    });
  }


  backPoney() {                    //Retransforme les licornes en poney
    return new Promise((resolve, reject) => {
      this.isUsed = true;
      setTimeout(() => {
        if (this.isUnicorn) {
          resolve();
          this.energy = 0;
        }
        else {
          reject();
        }
      }, 100);
      this.isUsed = false;
    });
  }
}

module.exports = {Poney};
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






//setTimeout(() => MyPoney.killPoney(), 10000);

