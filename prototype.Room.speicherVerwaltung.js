const { isEmpty } = require("lodash");

module.exports = function() {

    var memoryName = "roomMemory";

    /**
     * Speichert einen Eintrag
     * 
     * @param {*} name Der Name, den der Eintrag haben soll(zum wiederfinden)
     * @param {*} wert Ordne dem einen Wert zu
     */
     Room.prototype.speichere = function(name, wert){
        if (Memory[memoryName] == undefined){
            Memory[memoryName] = [];
        }
        if (this.getSpeicher() == undefined){
            Memory[memoryName].push({"id": this.name, [name]: wert});
        }else{
            this.speicherInExisitiertenSpeicher(name,wert);
        }
    };

    /**
     * Gibt den gesamten speicher fuer dieses Objekt aus
     * 
     * @returns Gibt den Gesamten Speicher fuer dieses Objekt aus, falls kein Speicher exisitiert -> undefined
     */
     Room.prototype.getSpeicher = function(){
        if (Memory[memoryName] == undefined || isEmpty(Memory[memoryName])){
            return undefined;
        }
        var stelleImSpeicher = this.findeStelleImRoadSpeicher();
        if(stelleImSpeicher >= 0){
            return Memory[memoryName][stelleImSpeicher];
        }
        return undefined;
    };

    /**
     * Loescht einen bestimmten Eintrag im speicher, falls ein Speicher existiert
     * 
     * @param {*} name Der Name des Eintrages
     */
     Room.prototype.loscheEintragImSpeicher = function(name){
        if (name == "id"){
            console.log("Du solltest die ID nicht loeschen");
        }else{
            var stelleImSpeicher = this.findeStelleImRoadSpeicher();
            if (stelleImSpeicher >= 0){
                Memory[memoryName][stelleImSpeicher][[name]] = undefined;
            }
        }
    };

    /**
     * Loescht den gesamten Speicher, der fuer dieses Objekt angelegt wurde
     */
     Room.prototype.loscheGanzenSpeicher = function(){
        var stelleImSpeicher = this.findeStelleImRoadSpeicher();
        if (stelleImSpeicher >= 0){
            Memory[memoryName].splice(stelleImSpeicher,1);
        }
    };






    /**                         **\
     *                           *
     *                           *
     *      PRIVATE METHODEN     *
     *                           *
     *                           *
    \*                           */





    /**
     * Speichert einen Eintrag, wenn bereits ein Speicher fuer dieses Objekt angelegt wurde
     * 
     * @param {*} name Der Name, den der Eintrag haben soll(zum wiederfinden)
     * @param {*} wert Ordne dem einen Wert zu
     */
     Room.prototype.speicherInExisitiertenSpeicher = function(name,wert){
        var stelleImSpeicher = this.findeStelleImRoadSpeicher();
        if (stelleImSpeicher >= 0){
            Memory[memoryName][stelleImSpeicher][[name]] = wert;
        }
    };

    /**
     * findet den Index, an dem der Objekt Speicher in der Memory liegt
     * 
     * @returns den Index, wenn nicht existiert -> -1
     */
     Room.prototype.findeStelleImRoadSpeicher = function(){
        if (isEmpty(Memory[memoryName])){
            return -1;
        }
        for(i = 0; i < Memory[memoryName].length; i++){
            if (this.name == Memory[memoryName][i].id){
                return i;
            }
        }
        return -1;
    };
};