var roleUpgrader = require('role.Upgrader');
module.exports = {

    run: function(creep){

        //Wenn wir im hauptraum sind
        if (creep.room.name != creep.memory.zielRaum) {
            //Wenn genug energie da ist
            if (creep.arbeitet()){
                    roleUpgrader.run(creep);
            //Wenn nicht genug Energie da ist -> Energie holen
            }else {
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.zielRaum)));
            }
        //Wenn wir im zielRaum sind
        }else{
            //Wenn genug energie da ist -> zurueck gehen
            if (creep.arbeitet()){
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.hauptRaum)));
                //Wenn nicht genug Energie da ist -> Energie holen
            }else {
                roleUpgrader.run(creep);
            }
        }
    }
}