require('prototype.creep.suchen')();
module.exports = function () {

    /**
     * Laesst den creep in den gegeben Raum gehen
     *
     * @param raumName in welchen Raum soll er gehen
     * @returns {boolean} geht er dort hin? False, wenn er schon da ist. Oder undefined bei einem Fehler
     */
    Creep.prototype.geheInRaum = function (raumName) {
        if (this.room.name != raumName){
            this.moveTo(this.sucheRaumExit(raumName));
            return true;
        }else{
            return false;
        }
        return undefined;
    }
}