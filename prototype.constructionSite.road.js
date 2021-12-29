const { isEmpty } = require("lodash");

module.exports = function() {

    /**
     * Speichert einen Eintrag
     * 
     * @param {*} name Der Name, den der Eintrag haben soll(zum wiederfinden)
     * @param {*} wert Ordne dem einen Wert zu
     */
    ConstructionSite.prototype.speichere = function(name, wert){
        if (Memory.roadMemory == undefined){
            Memory.roadMemory = [];
        }
        if (this.getSpeicher() == undefined){
            Memory.roadMemory.push({"id": this.id, [name]: wert});
        }else{
            this.speicherInExisitiertenSpeicher(name,wert);
        }
    };

    /**
     * Gibt den gesamten speicher fuer dieses Objekt aus
     * 
     * @returns Gibt den Gesamten Speicher fuer dieses Objekt aus, falls kein Speicher exisitiert -> undefined
     */
     ConstructionSite.prototype.getSpeicher = function(){
        if (Memory.roadMemory == undefined || isEmpty(Memory.roadMemory)){
            return undefined;
        }
        var stelleImSpeicher = this.findeStelleImRoadSpeicher();
        if(stelleImSpeicher >= 0){
            return Memory.roadMemory[stelleImSpeicher];
        }
        return undefined;
    };

    /**
     * Loescht einen bestimmten Eintrag im speicher, falls ein Speicher existiert
     * 
     * @param {*} name Der Name des Eintrages
     */
     ConstructionSite.prototype.loscheEintragImSpeicher = function(name){
        if (name == "id"){
            console.log("Du solltest die ID nicht loeschen");
        }else{
            var stelleImSpeicher = this.findeStelleImRoadSpeicher();
            if (stelleImSpeicher >= 0){
                Memory.roadMemory[stelleImSpeicher][[name]] = undefined;
            }
        }
    };

    /**
     * Loescht den gesamten Speicher, der fuer dieses Objekt angelegt wurde
     */
     ConstructionSite.prototype.loscheGanzenSpeicher = function(){
        var stelleImSpeicher = this.findeStelleImRoadSpeicher();
        if (stelleImSpeicher >= 0){
            Memory.roadMemory.splice(stelleImSpeicher,1);
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
        ConstructionSite.prototype.speicherInExisitiertenSpeicher = function(name,wert){
        var stelleImSpeicher = this.findeStelleImRoadSpeicher();
        if (stelleImSpeicher >= 0){
            Memory.roadMemory[stelleImSpeicher][[name]] = wert;
        }
    };

    /**
     * findet den Index, an dem der Objekt Speicher in der Memory liegt
     * 
     * @returns den Index, wenn nicht existiert -> -1
     */
        ConstructionSite.prototype.findeStelleImRoadSpeicher = function(){
        if (isEmpty(Memory.roadMemory)){
            return -1;
        }
        for(i = 0; i < Memory.roadMemory.length; i++){
            if (this.id == Memory.roadMemory[i].id){
                return i;
            }
        }
        return -1;
    };
};