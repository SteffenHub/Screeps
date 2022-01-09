
module.exports = {
    run: function(creep){

        //Wenn der Creep Energie dabei hat
        if (creep.arbeitet()){
            //Erstmal tower voll machen
            var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity});
            if (tower != undefined){
                creep.energieAbgeben(tower);
            //Dann Spawn voll machen    
            }else if (creep.room.find(FIND_MY_SPAWNS, {filter: (s) => s.energy < s.energyCapacity}).length != 0) {
                    creep.energieAbgeben(creep.room.find(FIND_MY_SPAWNS)[0]);
            }else{
                var extension = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity});
                //Dann Extensions voll machen
                if (extension != undefined){
                    creep.energieAbgeben(extension);
                }else{
                    //Container voll machen oder so
                }
            }
        //Der Creep hat keine Energie mehr    
        }else{
            creep.holeEnergie();
        }
    }
};