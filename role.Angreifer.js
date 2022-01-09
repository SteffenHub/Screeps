
module.exports = {

    run: function(creep){

        //Erstmal in den Raum gehen, der angeriffen werden soll
        if (creep.room.name != creep.memory.zielRaum) {
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.zielRaum)));
        } else {
            //Feindliche creeps angreifen
            var creeps = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            if (creeps != undefined) {
                if (creep.attack(creeps) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creeps);
                }
            } else {
                //Spawn angreifen
                var spawn = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_SPAWN});
                if (spawn != undefined) {
                    if (creep.attack(spawn) == ERR_NOT_IN_RANGE){
                        creep.moveTo(spawn);
                    }
                } else {
                    //alles andere ausser controller angreifen
                    var gebauede = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType != STRUCTURE_CONTROLLER && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART});
                    if (gebauede != undefined) {
                        if (creep.attack(gebauede) == ERR_NOT_IN_RANGE){
                            creep.moveTo(gebauede);
                        }
                    }
                }
            }
        }
    }
};