module.exports = {
    run: function (creep) {
        //Wenn der Creep Energie dabei hat
        if (creep.arbeitet()) {
            if (Game.getObjectById(creep.memory.zielSource.id) != undefined && Game.getObjectById(creep.memory.zielSource.id).memory.Container != undefined) {
                creep.energieAbgeben(Game.getObjectById(Game.getObjectById(creep.memory.zielSource.id).memory.Container.id));
            }
            //Der Creep hat keine Energie mehr
        } else {
            if (creep.harvest(Game.getObjectById(creep.memory.zielSource.id)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.zielSource.id));
            }
        }
    }
};