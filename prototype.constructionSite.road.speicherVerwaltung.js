const { isEmpty } = require("lodash");
var speicherVerwaltung = require('speicherVerwaltung');

module.exports = function() {

    var memoryName = "roadMemory";

    /**
     * Speichert einen Eintrag
     * 
     * @param {*} name Der Name, den der Eintrag haben soll(zum wiederfinden)
     * @param {*} wert Ordne dem einen Wert zu
     */
    ConstructionSite.prototype.speichere = function(name, wert){
        speicherVerwaltung.speichere(memoryName, this.id, name, wert);
    };

    /**
     * Gibt den gesamten speicher fuer dieses Objekt aus
     * 
     * @returns Gibt den Gesamten Speicher fuer dieses Objekt aus, falls kein Speicher exisitiert -> undefined
     */
    ConstructionSite.prototype.getSpeicher = function(){
        return speicherVerwaltung.getSpeicher(memoryName, this.id);
    };

    /**
     * Loescht einen bestimmten Eintrag im speicher, falls ein Speicher existiert
     * 
     * @param {*} name Der Name des Eintrages
     */
    ConstructionSite.prototype.loscheEintragImSpeicher = function(name){
        speicherVerwaltung.loscheEintragImSpeicher(memoryName, this.id, name);
    };

    /**
     * Loescht den gesamten Speicher, der fuer dieses Objekt angelegt wurde
     */
    ConstructionSite.prototype.loscheGanzenSpeicher = function(){
        speicherVerwaltung.loscheGanzenSpeicher(memoryName, this.id);
    };

    /**
     * Sucht im Speicher nach dem gegeben Eintrag und gibt diesen aus(else undefined)
     * 
     * @param {*} nameEintrag Der Name vom Eintrag, der ausgelesen werden soll 
     * 
     * @returns Den angefragten Eintrag. undefined, falls nicht existiert
     */
    ConstructionSite.prototype.getEintragAusSpeicher = function(nameEintrag){
        return speicherVerwaltung.getEintragAusSpeicher(memoryName, this.id, nameEintrag);
    }
};