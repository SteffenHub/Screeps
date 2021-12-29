const { isEmpty } = require("lodash");
var speicherVerwaltung = require('speicherVerwaltung');

module.exports = function() {

    var memoryName = "roomMemory";

    /**
     * Speichert einen Eintrag
     * 
     * @param {*} name Der Name, den der Eintrag haben soll(zum wiederfinden)
     * @param {*} wert Ordne dem einen Wert zu
     */
    Room.prototype.speichere = function(name, wert){
        speicherVerwaltung.speichere(memoryName, this.name, name, wert);
    };

    /**
     * Gibt den gesamten speicher fuer dieses Objekt aus
     * 
     * @returns Gibt den Gesamten Speicher fuer dieses Objekt aus, falls kein Speicher exisitiert -> undefined
     */
    Room.prototype.getSpeicher = function(){
        return speicherVerwaltung.getSpeicher(memoryName, this.name);
    };

    /**
     * Loescht einen bestimmten Eintrag im speicher, falls ein Speicher existiert
     * 
     * @param {*} name Der Name des Eintrages
     */
    Room.prototype.loscheEintragImSpeicher = function(name){
        speicherVerwaltung.loscheEintragImSpeicher(memoryName, this.name, name);
    };

    /**
     * Loescht den gesamten Speicher, der fuer dieses Objekt angelegt wurde
     */
    Room.prototype.loscheGanzenSpeicher = function(){
        speicherVerwaltung.loscheGanzenSpeicher(memoryName, this.name);
    };

    /**
     * findet den Index, an dem der Objekt Speicher in der Memory liegt
     * 
     * @returns den Index, wenn nicht existiert -> -1
     */
    Room.prototype.findeStelleImRoadSpeicher = function(){
        return speicherVerwaltung.findeStelleImRoadSpeicher(memoryName, this.name);
    };
};