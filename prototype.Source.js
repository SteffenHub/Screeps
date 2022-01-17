module.exports = function () {

    /**
     * Memory fuer sources definieren
     * https://github.com/screepers/screeps-snippets/blob/master/src/prototypes/JavaScript/Source/Memory%20for%20Source%20(or%20other%20objects).js
     */
    Object.defineProperty(Source.prototype, "memory", {
        configurable: true,
        get() {
            if (_.isUndefined(this.room.memory.sources)) {
                this.room.memory.sources = {};
            }
            return (this.room.memory.sources[this.id] =
                this.room.memory.sources[this.id] || {});
        },
        set(value) {
            if (_.isUndefined(this.room.memory.sources)) {
                this.room.memory.sources = {};
            }
            if (!_.isObject(Memory.structure)) {
                throw new Error("Could not set structure memory");
            }
            this.room.memory.sources[this.id] = value;
        }
    });
};