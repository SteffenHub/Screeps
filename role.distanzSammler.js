require('prototype.creep')();

module.exports = {
    run: function(creep){

        //Wenn der Creep Energie dabei hat
        if (creep.arbeitet()){
            if (creep.room.name != "E9N22"){
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo("E9N22")));
            }else{
                //Erstmal tower voll machen
                var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity});
                if (tower != undefined) {
                    creep.energieAbgeben(tower);
                    //Dann Spawn voll machen
                } else if (Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
                    creep.energieAbgeben(Game.spawns['Spawn1']);
                } else {
                    var extension = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity});
                    //Dann Extensions voll machen
                    if (extension != undefined) {
                        creep.energieAbgeben(extension);
                    } else {
                        //Container voll machen oder so
                    }
                }
            }
        //Der Creep hat keine Energie mehr
        }else{
            if (creep.room.name != "E9N21"){
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo("E9N21")));
            }else{
                creep.holeEnergie();
            }
        }
    }
};