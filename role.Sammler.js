require('prototype.creep.suchen')();

module.exports = {
    run: function (creep) {

        //Wenn der Creep Energie dabei hat
        if (creep.arbeitet()) {
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
                    //Wenn genug Sammler und Bauerbeiter -> Sammler werden zu Bauerbeitern
                    const roleBauerbeiter = require("./role.Bauerbeiter");
                    roleBauerbeiter.run(creep);
                }
            }
        //Der Creep hat keine Energie mehr
        } else {
            creep.holeEnergie();
        }
    }
};