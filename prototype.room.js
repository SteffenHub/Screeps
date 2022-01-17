require("./prototype.room.role.SammlerRaum")();

module.exports = function () {

    /**
     * Ruft den Code auf, der der Raum Role zugeordnet ist
     */
    Room.prototype.roleAusfuehren = function () {
        if (this.memory.role == "SammlerRaum") {
            this.runSammlerRaum();
        }
    }

    /**
     * Getter fuer den Controller Level
     *
     * @returns {number} Level vom Raum controller
     */
    Room.prototype.getControllerLevel = function () {
        return this.controller.level;
    };
};