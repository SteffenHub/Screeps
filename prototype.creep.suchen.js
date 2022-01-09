
module.exports = function () {

       /**                         **\
      |*          Energie           *|
      \*                           */


            /**
             * Gibt die naechste Energie Source aus, die noch Energie hat
             *
             * @returns {*} Energie Source. undefined, wenn es keine gibt
             */
            Creep.prototype.sucheNaechsteEnergieSourceMitEnergie = function (){
                return this.pos.findClosestByPath(FIND_SOURCES, {filter: (s) => s.energy > 0});
            };

            /**
             * Gibt die naechste fallen gelassen Energie Resource aus, die auch noch Energie hat
             *
             * @returns {*} Dropped Energie Reource. undefined, wenn es keine gibt
             */
            Creep.prototype.sucheNaechstefallenGelasseneResourceMitEnergie = function (){
                return this.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: (s) => s.energy > 0});
            };

            /**
             * Gibt den naechsten Grabstein aus, der auch noch Energie hat
             *
             * @returns {*} Grabstein. undefined, wenn es keine gibt
             */
            Creep.prototype.sucheNaechsteGrabsteinMitEnergie = function (){
                return this.pos.findClosestByPath(FIND_TOMBSTONES, {filter: (t) => t.store.energy > 0});
            };

            /**
             * Gibt die naechste Ruine aus, die auch noch Energie hat
             *
             * @returns {*} Ruine. undefined, wenn es keine gibt
             */
            Creep.prototype.sucheNaechsteRuineMitEnergie = function (){
                return this.pos.findClosestByPath(FIND_RUINS, {filter: (r) => r.store.energy > 0});
            };


      /**                         **\
     |*        Baustellen          *|
     \*                           */


            /**
             * Gibt das naechste Gebauede aus, dass noch nicht fertig gebaut ist
             *
             * @returns {*} Structure. undefined, wenn es keine gibt
             */
            Creep.prototype.sucheNaechstenBauauftrag = function (){
                return this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            };

            /**
             * Gibt die naechste Extension aus, die noch nicht fertig gebaut ist
             *
             * @returns {*} Extension(Construction). undefined, wenn es keine gibt
             */
            Creep.prototype.sucheNaechstenBauauftragExtension = function (){
                return this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, { filter: (s) => {return s.structureType == STRUCTURE_EXTENSION}});
            };


      /**                       **\
     |*         Gebauede         *|
     \*                         */


            /**
             * Gibt den naechsten Spawn aus
             *
             * @returns {*} Spawn. undefined, wenn es keine gibt
             */
            Creep.prototype.sucheNaechstenSpawn = function (){
                return this.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_SPAWN});
            };

            /**
             * Gibt den naechsten Spawn aus
             *
             * @returns {*} Spawn. undefined, wenn es keine gibt
             */
            Creep.prototype.sucheNaechsteStrukturOhneMauernUndController = function (){
                return this.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType != STRUCTURE_CONTROLLER && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART});
            };

            /**
             * Gibt den naechsten Tower aus, der noch nicht voll mit Energie ist
             *
             * @returns {*} Tower. undefined, wenn es keine gibt
             */
            Creep.prototype.sucheNaechstenTowerNichtVoll = function (){
                return this.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity});
            };

            /**
             * Gibt die naechste Extension aus, die nicht voll mit Energie ist
             *
             * @returns {*} Extension. undefined, wenn es keine gibt
             */
            Creep.prototype.sucheNaechsteExtensionNichtVoll = function (){
                return this.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity});
            };

            /**
             * Gibt das naechste gebauede aus, dass nur halbes Leben hat
             *
             * @returns {*} Structure. undefined, wenn es keine gibt
             */
            Creep.prototype.sucheNaechsteStrukturNichtMauerMitHalbeLeben = function (){
                return this.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.hits < (s.hitsMax/2) && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART});
            };


      /**                       **\
     |*         Raum             *|
     \*                         */


            /**
             * gibt die naechste moeglichkeit in den Raum zu gehen
             *
             * @param raumName in welchen Raum soll der gehen
             * @returns {*} der uebergangsort von diesem und dem gewuenschten raum
             */
            Creep.prototype.sucheRaumExit = function (raumName) {
                return this.pos.findClosestByPath(this.room.findExitTo(raumName));
            };


      /**                       **\
     |*         Angriff          *|
     \*                         */

            /**
             * Gibt den naechsten Gegner aus
             *
             * @returns {*} Gegner. undefined, wenn es keine gibt
             */
            Creep.prototype.sucheNaechstenGegner = function (){
                return this.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            };
};