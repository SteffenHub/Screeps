module.exports = function () {

    /**
     * Gibt alle Spawns in diesem Raum aus als Liste
     *
     * @returns {*} alle Spawns im Raum als Liste
     */
    Room.prototype.Spawns = function () {
        return this.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_SPAWN});
    }

    /**
     * Gibt alle Energie Sourcen aus, die es im Raum gibt
     *
     * @returns {*} alle Energie Sourcen im Raum als Liste
     */
    Room.prototype.EnergieSources = function () {
        return this.find(FIND_SOURCES, {filter: (s) => s.energy != null});

    }
};