require('prototype.creep.bewegung')();
require('prototype.creep.suchen')();
module.exports = {
    run: function (creep) {

        //Wenn der Creep Energie dabei hat
        if (creep.arbeitet()) {
            if (!creep.geheInRaum(creep.memory.hauptRaum)){
                //Erstmal tower voll machen
                var tower = creep.sucheNaechstenTowerNichtVoll();
                if (tower != undefined) {
                    creep.energieAbgeben(tower);
                    //Dann Spawn voll machen
                } else if (creep.room.find(FIND_MY_SPAWNS, {filter: (s) => s.energy < s.energyCapacity}).length != 0) {
                    creep.energieAbgeben(creep.room.find(FIND_MY_SPAWNS)[0]);
                } else {
                    var extension = creep.sucheNaechsteExtensionNichtVoll();
                    //Dann Extensions voll machen
                    if (extension != undefined) {
                        creep.energieAbgeben(extension);
                    } else {
                        //Container voll machen oder so
                    }
                }
            }
            //Der Creep hat keine Energie mehr
        } else {
            //Wenn der Creep im zielRaum ist
            if (!creep.geheInRaum(creep.memory.zielRaum)){
                //hole dort Energie
                creep.holeEnergie();
            }
        }
    }
};