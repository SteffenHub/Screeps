var roleUpgrader = require('role.Upgrader');

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
                        var kaputtesGebauede = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.hits < (s.hitsMax/2) && s.structureType != STRUCTURE_WALL});

                        //Wenn ein Gebauede mit 50% Leben existiert
                        if(kaputtesGebauede != undefined){
                            creep.memory.reparierZiel = kaputtesGebauede;
                            this.reparieren(creep,kaputtesGebauede);
                        //Sonst baue neue Sachen
                        }else{
                            var gebaeude = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                            //Wenn es arbeit gibt -> arbeite
                            if (gebaeude != undefined){
                                this.bauen(creep,gebaeude);
                            //Wenn es keine arbeit gibt -> werde upgrader
                            }else{
                                roleUpgrader.run(creep);
                            }
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