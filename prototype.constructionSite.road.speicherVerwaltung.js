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
     * findet den Index, an dem der Objekt Speicher in der Memory liegt
     * 
     * @returns den Index, wenn nicht existiert -> -1
     */
    ConstructionSite.prototype.findeStelleImRoadSpeicher = function(){
        return speicherVerwaltung.findeStelleImRoadSpeicher(memoryName, this.id);
    };
};