/**
 * Created by Stef on 19/03/2017.
 */
/**
 * Created by stef on 10/03/17.
 */


class Spiderman {
  constructor(myponey,myobjgerecycle) {

    this.regInterPlay= setInterval(() => this.playPoney(), 1000);
    this.poneys = myponey;
    this.gerecycle = myobjgerecycle;

    this.gerecycle.eventgerecyclejour.on('Jour', function(){
      console.log(colors.bg.Blue,'Jour : Spiderman est plus joueur !',colors.Reset);
      clearInterval(this.regInterPlay);
      this.regInterPlay = setInterval(() => this.playPoney(),1500);     //1000 ?
    });

    this.gerecycle.eventgerecyclejour.on('Nuit', function(){
      console.log(colors.bg.Red,'NUIT : Spiderman dort et est moins joueur',colors.Reset);
      clearInterval(this.regInterPlay);
      this.regInterPlay = setInterval(() => this.playPoney(),2000);
    });
  }
    playPoney(){
    this.checkPoney()
      .then(() => {
        console.log(colors.fg.Red,'SPIDERMAN joueur et epuise licorne',colors.Reset);
      })
      .catch(() => {
        console.log(colors.fg.Red,'SPIDERMAN pas joueur',colors.Reset);
      })
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
                console.log(colors.fg.Red, `Licorn ${iNumPoney} to Poney ok`, colors.Reset);
                this.isRegenerate = true;
                resolve();
              })
              .catch(() => {
                console.log(colors.fg.Red, `Number ${iNumPoney} Already poney`, colors.Reset);
                reject();
              })
          }

          else {
            console.log(colors.fg.Red, `Reste une licorne pour cette fois ! Numero : ${iNumPoney}`, colors.Reset);
            reject();
          }
        }
        else{
          console.log(colors.fg.Red,`Number ${iNumPoney} already used by DeadPool`, colors.Reset);
        }
      }, 100);
    });
  }
}
module.exports = {Spiderman};


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