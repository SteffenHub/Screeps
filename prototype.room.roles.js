module.exports = function () {

    /**
     * Kuemmert sich darum ,dass eine Grundstruktur gelegt wird.
     * Mit Container, Sammlern, Miner und Bauarbeiter
     *
     * @returns {boolean} true, wenn Grundstruktur gelegt. False, wenn nicht
     */
    Room.prototype.kuemmereUmGrundStruktur = function () {
        //Constructions sites fuer Container erstellen und memory aktualisieren
        for (let i = 0; i < this.EnergieSources().length; i++) {
            this.kuemmereUmContainer(this.EnergieSources()[i]);
        }

        //Wenn wir keine Creeps mehr haben
        if (_.sum(Game.creeps, (c) => c.memory.hauptRaum == this.name) == 0) {
            this.Spawns()[0].createCreep([WORK, CARRY, CARRY, MOVE], undefined, {
                role: "Sammler",
                hauptRaum: this.name
            });
            return false;
        }

        //pruefe ob das minimum an creeps da sind
        if (!this.standartCreepsSindDa()) {
            return false;
        }

        //Wenn nicht genug Container oder Miner
        if (!this.alleSourcesMitContainer() || !this.alleSourcesMitMiner()) {
            for (let source of this.find(FIND_SOURCES)) {
                if (source.memory.Container != undefined && Game.getObjectById(source.memory.Container.id) != undefined && Game.getObjectById(source.memory.Container.id).progress == null
                    && (source.memory.Miner == undefined || Game.getObjectById(source.memory.Miner.id) == undefined)) {
                    this.kuemmereUmMiner(source);
                }
            }
            return false;
        }
        return true;
    }

    /**
     * Es wird geguckt, ob genug creeps da sind, um den Raum am Leben zu behalten.
     * Wenn nicht werden diese gespawnt
     *
     * @returns {boolean} sind genug creeps da, um den Raum am Leben zu halten
     */
    Room.prototype.standartCreepsSindDa = function () {
        if (_.sum(Game.creeps, (c) => c.memory.role == 'Sammler' && c.memory.hauptRaum == this.name) < 2) {
            this.Spawns()[0].spawnSammler();
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Bauerbeiter' && c.memory.hauptRaum == this.name) < 4) {
            this.Spawns()[0].spawnBauerbeiter();
        } else {
            return true;
        }
        return false;
    }

    /**
     * Es wird ein neuer Miner fuer diese Source gespawnt und in der Memory gespeichert, wenn es einen Miner gibt
     *
     * @param source die Source, die einen Miner brauechte
     */
    Room.prototype.kuemmereUmMiner = function (source) {
        if (source.memory.Miner != undefined && Game.getObjectById(source.memory.Miner.id) != undefined) {
            return;
        }
        for (let name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == "Miner" && creep.memory.zielSource.id == source.id) {
                source.memory.Miner = creep;
                break;
            }
        }
        var spawn = this.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_SPAWN})[0];
        spawn.spawnMiner(this.name, source);
    }

    /**
     * Es wird ein neuer Container fuer diese Source gespawnt und in der Memory gespeichert, wenn es einen Container gibt
     *
     * @param source die Source, die einen Container brauechte
     */
    Room.prototype.kuemmereUmContainer = function (source) {
        if (source.memory.Container != undefined && Game.getObjectById(source.memory.Container.id) != undefined) {
            return;
        }
        var position = this.findPath(source.pos, this.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_SPAWN})[0].pos, {ignoreCreeps: true})[0];
        var container = this.find(FIND_CONSTRUCTION_SITES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && Math.abs(s.pos.x - source.pos.x) <= 1 && Math.abs(s.pos.y - source.pos.y) <= 1})[0];
        if (container != undefined) {
            source.memory.Container = container;
        } else {
            container = this.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && Math.abs(s.pos.x - source.pos.x) <= 1 && Math.abs(s.pos.y - source.pos.y) <= 1})[0];
            if (container != undefined) {
                source.memory.Container = container;
            }
        }
        this.createConstructionSite(position.x, position.y, STRUCTURE_CONTAINER);
    }

    /**
     * Guckt, ob alle Sources einen Container haben, der auch schon fertig gebaut ist
     *
     * @returns {boolean} haben alle Sources einen fertigen Container
     */
    Room.prototype.alleSourcesMitContainer = function () {
        var allesBesetzt = true;
        for (let source of this.find(FIND_SOURCES)) {
            if (source.memory.Container == undefined || Game.getObjectById(source.memory.Container.id) == undefined || Game.getObjectById(source.memory.Container.id).progress != null) {
                allesBesetzt = false;
            }
        }
        return allesBesetzt;
    }

    /**
     * Guckt, ob alle Sources einen Miner haben
     *
     * @returns {boolean} haben alle Sources einen Miner
     */
    Room.prototype.alleSourcesMitMiner = function () {
        var alleBesetzt = true;
        for (let source of this.find(FIND_SOURCES)) {
            if (source.memory.Miner == undefined || Game.getObjectById(source.memory.Miner.id) == undefined) {
                source.memory.Miner = undefined;

                alleBesetzt = false;
            }
        }
        return alleBesetzt;
    }
};