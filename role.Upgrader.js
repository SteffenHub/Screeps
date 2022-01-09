

module.exports = {
    run: function(creep){

        if (creep.arbeitet()){
               //Erstmal tower voll machen
               var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity});
               if (tower != undefined){
                    creep.energieAbgeben(tower);
               }else{
                    creep.energieAbgeben(creep.room.controller);
               }
        }else{
             creep.holeEnergie();
        }
     }
};