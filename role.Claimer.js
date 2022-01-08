require('prototype.creep')();
var roleBauerbeiter = require('role.Bauerbeiter');

module.exports = {
    run: function(creep){

        //Wenn der Creep Energie dabei hat
        if (creep.arbeitet()){
            if (creep.room.name != creep.memory.zielRaum) {
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.zielRaum)));
            } else {
                if (creep.room.controller.owner != undefined){
                    roleBauerbeiter.run(creep);
                }else if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        //Der Creep hat keine Energie mehr
        }else{
            creep.holeEnergie();
        }
    }
};