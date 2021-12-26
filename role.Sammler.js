
const { drop } = require('lodash');
require('prototype.creep')();


module.exports = {
    run: function(creep){

        //Wenn der Creep Energie dabei hat
        if (creep.arbeitet()){
            //Erstmal Spawn voll machen
            if (Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity){
                creep.energieAbgeben(Game.spawns['Spawn1']);
            }else{
                var extension = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity});
                //Dann Extensions voll machen
                if (extension != undefined){
                    creep.energieAbgeben(extension);
                //dann tower voll machen
                }else{
                    var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity});
                    creep.energieAbgeben(tower);
                }
            }
        //Der Creep hat keine Energie mehr    
        }else{
            creep.holeEnergie();
        }
    }
};