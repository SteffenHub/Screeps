var Creep = require('Creep');
var roleUpgrader = require('role.Upgrader');

module.exports = {

    run: function(creep){

        Creep.arbeitEinteilen(creep);

        //Wenn arbeitet -> arbeit machen
        if (creep.memory.arbeitet){
            //Extensions bevorzugen
            var extension = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, { filter: (s) => {return s.structureType == STRUCTURE_EXTENSION}});
            if(extension != undefined){
                this.bauen(creep,extension);
            //Sonst alle anderen Gebaeude    
            }else{
                var kaputtesGebauede = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.hits < (s.hitsMax/2) && s.structureType != STRUCTURE_WALL});
                //Wenn ein Gebauede mit 50% Leben existiert
                if(kaputtesGebauede != undefined){
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
        //arbeit nicht -> Energie aufladen
        }else{
            Creep.energieHolen(creep);
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