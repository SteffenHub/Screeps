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
        }else if (this.room.name == raumName){
            return false;
        }
        return undefined;
    };

    Creep.prototype.geheZumHauptRaum = function(){
        if (this.memory.hauptRaum == undefined){
            //console.log("Es existiert kein hauptRaum im speicher von: " + this.name);
            return undefined;
        }
        if (this.room.name == this.memory.hauptRaum){
            return false;
        }
        return this.geheInRaumDurchZwRaum(this.memory.hauptRaum, this.memory.geheDurchRaum);
    }

    Creep.prototype.geheZumZielRaum = function(){
        if (this.memory.zielRaum == undefined){
            //console.log("Es existiert kein zielRaum im speicher von: " + this.name);
            return undefined;
        }
        if (this.room.name == this.memory.zielRaum){
            return false;
        }
        return this.geheInRaumDurchZwRaum(this.memory.zielRaum, this.memory.geheDurchRaum);
    };


     /*                       *\
    |     Private Methoden      |
     \*                       */




    Creep.prototype.geheInRaumDurchZwRaum = function(zielRaum, zwischenRaum){
        //Wenn es einen zwischenraum gibt und der creep gerade hin geht
        if (zwischenRaum != undefined && !this.geheInRaum(zwischenRaum)){
            return true;
        //Wenn wir im zielRaum sind
        }else{
            return this.geheInRaum(zielRaum);
        }
    };
};