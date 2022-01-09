require('prototype.creep.suchen')();

module.exports = {
    run: function(creep){

        if (creep.arbeitet()){
               //Erstmal tower voll machen
               var tower = creep.sucheNaechstenTowerNichtVoll();
               if (tower != undefined){
                    creep.energieAbgeben(tower);
               }else{
                    creep.energieAbgeben(creep.room.controller);
               }
        }else{
             creep.holeEnergie();
        }
     }
};