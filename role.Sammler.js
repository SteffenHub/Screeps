var Creep = require('Creep');
const { drop } = require('lodash');


module.exports = {
    run: function(creep){

        Creep.arbeitEinteilen(creep);

        //Wenn der Creep Energie dabei hat
        if (creep.memory.arbeitet){
            //Erstmal Spawn voll machen
            if (Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity){
                Creep.energieAbgeben(creep,Game.spawns['Spawn1']);
            }else{
                var extension = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity});
                //Dann Extensions voll machen
                if (extension != undefined){
                    Creep.energieAbgeben(creep,extension);
                //dann tower voll machen
                }else{
                    var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity});
                    Creep.energieAbgeben(creep,tower);
                }
            }
        //Der Creep hat keine Energie mehr    
        }else{
            Creep.energieHolen(creep);
        }
    }
};