module.exports = {
    run: function (creep) {
        var mauer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
                && s.pos.x == creep.memory.atkX
                && s.pos.y == creep.memory.atkY
        });
        if (mauer != undefined) {
            if (creep.attack(mauer) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mauer);
            }
        }
    }

};