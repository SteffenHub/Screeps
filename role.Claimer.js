
var roleBauerbeiter = require('role.Bauerbeiter');

module.exports = {
    run: function(creep){
        if (creep.room.name != creep.memory.zielRaum) {
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.zielRaum)));
        } else {

            if (creep.room.controller.owner != undefined){
                if (creep.room.controller.username != "OR1EQUALS1"){
                    if (creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE){
                        creep.moveTo(creep.room.controller);
                    }
                }else {
                    roleBauerbeiter.run(creep);
                }
            }else if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};