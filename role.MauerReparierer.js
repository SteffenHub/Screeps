var roleBauerbeiter = require('role.Bauerbeiter');

module.exports = {

    run: function(creep){

        //Wenn arbeitet -> arbeit machen
        if (creep.arbeitet()){
            //Erstmal tower voll machen
            var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity});
            if (tower != undefined){
                creep.energieAbgeben(tower);
            }else{
                //Extensions bevorzugen
                var extension = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, { filter: (s) => {return s.structureType == STRUCTURE_EXTENSION}});
                if(extension != undefined){
                    this.bauen(creep,extension);
                    //Sonst alle anderen Gebaeude
                }else{
                    //Wenn er eine Reparier Auftrag hat
                    if (creep.memory.reparierZiel != undefined){
                        if (Game.getObjectById(creep.memory.reparierZiel.id) == undefined){
                            creep.Memory.reparierZiel = undefined;
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
                        var kaputteMauern = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_WALL || s.structureType == StructureRampart});
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