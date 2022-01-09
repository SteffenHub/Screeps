var roleBauerbeiter = require('role.Bauerbeiter');
require('prototype.creep.suchen')();

module.exports = {

    run: function(creep){

        //Wenn arbeitet -> arbeit machen
        if (creep.arbeitet()){
            //Erstmal tower voll machen
            var tower = creep.sucheNaechstenTowerNichtVoll();
            if (tower != undefined){
                creep.energieAbgeben(tower);
            }else{
                //Extensions bevorzugen
                var extension = creep.sucheNaechstenBauauftragExtension();
                if(extension != undefined){
                    this.bauen(creep,extension);
                    //Sonst alle anderen Gebaeude
                }else{
                    //Wenn er eine Reparier Auftrag hat
                    if (creep.memory.reparierZiel != undefined){
                        if (Game.getObjectById(creep.memory.reparierZiel.id) == undefined){
                            creep.memory.reparierZiel = undefined;
                        }else{
                            //Wenn das zu reparierende Gebauede fertig repariert ist
                            if (Game.getObjectById(creep.memory.reparierZiel.id).hits == Game.getObjectById(creep.memory.reparierZiel.id).hitsMax){
                                creep.memory.reparierZiel = undefined;
                            }else{
                                this.reparieren(creep,Game.getObjectById(creep.memory.reparierZiel.id));
                            }
                        }
                        //Wenn es keinen reparier Auftrag gibt -> suche nach einen
                    }else{
                        var kaputteMauern = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART});
                        //Wenn es mind. eine Mauer gibt
                        if(kaputteMauern != undefined && kaputteMauern.length != 0){
                            var schlimmesteMauer = kaputteMauern[0];
                            for (let i = 1; i < kaputteMauern.length; i++) {
                                if (kaputteMauern[i].hits < schlimmesteMauer.hits){
                                    schlimmesteMauer = kaputteMauern[i];
                                }
                            }
                            creep.memory.reparierZiel = schlimmesteMauer;
                            this.reparieren(creep,schlimmesteMauer);
                            //Sonst baue neue Sachen
                        }else{
                            roleBauerbeiter.run(creep);
                        }
                    }
                }
            }
            //arbeit nicht -> Energie aufladen
        }else{
            creep.holeEnergie();
            if (creep.memory.reparierZiel != undefined) {
                creep.memory.reparierZiel = undefined;
            }
        }
    }

    ,bauen: function(creep,ziel){
        if(creep.build(ziel) == ERR_NOT_IN_RANGE){
            creep.moveTo(ziel);
        }
    }

    ,reparieren: function(creep,ziel){
        if(creep.repair(ziel) == ERR_NOT_IN_RANGE){
            creep.moveTo(ziel);
        }
    }
};