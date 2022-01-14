require('prototype.creep.bewegung')();
var roleBauerbeiter = require('role.Bauerbeiter');

module.exports = {
    run: function(creep){
        //Gehe erstmal in den Ziel Raum
        if (!creep.geheInRaum(creep.memory.zielRaum)){
            if (creep.room.controller.owner != undefined || creep.room.controller.reservation != null){
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