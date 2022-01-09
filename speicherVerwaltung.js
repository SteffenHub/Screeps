module.exports = {

    /**
     * Speichert einen Eintrag
     * 
     * @param {*} memoryName Der Name, den der Speicher in der Memory hat(Objekttyp spezifisch)
     * @param {*} objektID Eine ID, mit der das Objekt eindeutig bestimmbar ist
     * @param {*} name Der Name, den der Eintrag haben soll(zum wiederfinden)
     * @param {*} wert Ordne dem einen Wert zu
     */
    speichere: function(memoryName, objektID, name, wert){
        if (Memory[memoryName] == undefined){
            Memory[memoryName] = [];
        }
        if (this.getSpeicher(memoryName, objektID) == undefined){
            Memory[memoryName].push({"id": objektID, [name]: wert});
        }else{
            this.speicherInExisitiertenSpeicher(memoryName, objektID, name,wert);
        }
    }

    /**
     * Gibt den gesamten speicher fuer dieses Objekt aus
     * 
     * @param {*} memoryName Der Name, den der Speicher in der Memory hat(Objekttyp spezifisch)
     * @param {*} objektID Eine ID, mit der das Objekt eindeutig bestimmbar ist
     * 
     * @returns Gibt den Gesamten Speicher fuer dieses Objekt aus, falls kein Speicher exisitiert -> undefined
     */
    ,getSpeicher: function(memoryName, objektID){
        var stelleImSpeicher = this.findeStelleImRoadSpeicher(memoryName, objektID);
        if(stelleImSpeicher >= 0){
            return Memory[memoryName][stelleImSpeicher];
        }
        return undefined;
    }

    /**
     * Loescht einen bestimmten Eintrag im speicher, falls ein Speicher existiert
     *
     * @param {*} memoryName Der Name, den der Speicher in der Memory hat(Objekttyp spezifisch)
     * @param {*} objektID Eine ID, mit der das Objekt eindeutig bestimmbar ist
     * @param {*} name Der Name des Eintrages
     */
    ,loscheEintragImSpeicher: function(memoryName, objektID, name){
        if (name == "id"){
            console.log("Du solltest die ID nicht loeschen");
        }else{
            var stelleImSpeicher = this.findeStelleImRoadSpeicher(memoryName, objektID);
            if (stelleImSpeicher >= 0){
                Memory[memoryName][stelleImSpeicher][[name]] = undefined;
            }
        }
    }

    /**
     * Loescht den gesamten Speicher, der fuer dieses Objekt angelegt wurde
     * 
     * @param {*} memoryName Der Name, den der Speicher in der Memory hat(Objekttyp spezifisch)
     * @param {*} objektID Eine ID, mit der das Objekt eindeutig bestimmbar ist
     */
    ,loscheGanzenSpeicher: function(memoryName, objektID){
        var stelleImSpeicher = this.findeStelleImRoadSpeicher(memoryName, objektID);
        if (stelleImSpeicher >= 0){
            Memory[memoryName].splice(stelleImSpeicher,1);
            //Wenn speicher leer -> loesche ihn
            if (Memory[memoryName].length == 0){
                Memory[memoryName] = undefined;
            }
        }
    }

    /**
     * Sucht im Speicher nach dem gegeben Eintrag und gibt diesen aus(else undefined)
     * 
     * @param {*} memoryName Der Name, den der Speicher in der Memory hat(Objekttyp spezifisch)
     * @param {*} objektID Eine ID, mit der das Objekt eindeutig bestimmbar ist
     * @param {*} eintragName Der Name vom Eintrag, der ausgelesen werden soll
     * 
     * @returns Den angefragten Eintrag. undefined, falls nicht existiert
     */
    ,getEintragAusSpeicher: function(memoryName, objektID, eintragName){
        var speicher = this.getSpeicher(memoryName, objektID);
        if (speicher != undefined){
            return speicher[eintragName];
        }
        return undefined;
    }






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
     * @param {*} memoryName Der Name, den der Speicher in der Memory hat(Objekttyp spezifisch)
     * @param {*} objektID Eine ID, mit der das Objekt eindeutig bestimmbar ist
     * @param {*} name Der Name, den der Eintrag haben soll(zum wiederfinden)
     * @param {*} wert Ordne dem einen Wert zu
     */
    ,speicherInExisitiertenSpeicher: function(memoryName, objektID, name,wert){
        var stelleImSpeicher = this.findeStelleImRoadSpeicher(memoryName, objektID);
        if (stelleImSpeicher >= 0){
            Memory[memoryName][stelleImSpeicher][[name]] = wert;
        }
    }

    /**
     * findet den Index, an dem der Objekt Speicher in der Memory liegt
     * 
     * @param {*} memoryName Der Name, den der Speicher in der Memory hat(Objekttyp spezifisch)
     * @param {*} objektID Eine ID, mit der das Objekt eindeutig bestimmbar ist
     * 
     * @returns den Index, wenn nicht existiert -> -1
     */
    ,findeStelleImRoadSpeicher: function(memoryName, objektID){
        if (Memory[memoryName] == undefined){
            return -1;
        }
        for(i = 0; i < Memory[memoryName].length; i++){
            if (objektID == Memory[memoryName][i].id){
                return i;
            }
        }
        return -1;
    }
};