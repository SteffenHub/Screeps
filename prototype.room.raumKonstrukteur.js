require('prototype.Room.speicherVerwaltung')();
require('prototype.road.SpeicherVerwaltung')();
require('prototype.constructionSite.road.speicherVerwaltung')();
require('prototype.room.usageTracker')();

module.exports = function(){

    var anzahlStrassen = 60;
    var ticksZumUpdate = 1000;

    /**
     * Kuemmert sich darum, dass in dem Raum Strassen gebaut werden, die anhand der Benutzung berechnet werden
     * Nur alle $ticksZumUpdate Ticks, und baut nur $anzahlStrassen Strassen.
     * Strassen, die mauell gebaut wurden werden nicht zerstoert
     */
    Room.prototype.baueStrassen = function(){

        /*
        //Fuer neu initialisieren vom roadMemory
        var strassenAlle = this.getAlleStrassenImRaum();
        for (let i = 0; i < strassenAlle.length; i++) {
            if (!(strassenAlle[i].pos.x == 10 && strassenAlle[i].pos.y == 30)
                && !(strassenAlle[i].pos.x == 12 && strassenAlle[i].pos.y == 31)
                && !(strassenAlle[i].pos.x == 10 && strassenAlle[i].pos.y == 39)
                && !(strassenAlle[i].pos.x == 4 && strassenAlle[i].pos.y == 42)
                && !(strassenAlle[i].pos.x == 3 && strassenAlle[i].pos.y == 43)){
                Game.getObjectById(strassenAlle[i].id).speichere("istAutomatischGebaut",true);
            }
        }
         */

        //Print anzahlStrassen wenn noetig
        if (this.getEintragAusSpeicher("printAnzahlStrassen") == undefined){
            this.speichere("printAnzahlStrassen", false);
        }else {
            if (this.getEintragAusSpeicher("printAnzahlStrassen")) {
                console.log("Es existieren derzeit " + this.getAlleStrassenImRaum().length + " Strassen im Raum " + this.name);
                this.speichere("printAnzahlStrassen", false);
            }
        }

        //manuell geloeschte Strassen updaten und mit roadMemory abgleichen
        if (this.getEintragAusSpeicher("ticksSeitStrassenUpdate")%20 == 0 || this.getEintragAusSpeicher("ticksSeitStrassenUpdate")%(ticksZumUpdate-1) != 0){
            var roadMemory = Memory.roadMemory;
            if (roadMemory != undefined) {
                for (let i = 0; i < roadMemory.length; i++) {
                    if (Game.getObjectById(roadMemory[i].id) == undefined) {
                        Memory.roadMemory.splice(i, 1);
                        --i;
                    }
                }
            }
        }

        this.fuegeEbenErstellteStrassenInMemoryEin();

        //Erst Nach 600 ticks strassen infrastruktur aktualisieren
        if (this.getEintragAusSpeicher("ticksSeitStrassenUpdate")%ticksZumUpdate != 0){
            return;
        }

        //Liste von genutzten orten im Raum mit hauefigkeit
        var nutzung = this.getUsageSortierteListeOhneManuellGebauteStrassen();
        //Liste aller fertigen strassen und nicht fertigen strassen im raum
        var alleStrassenImRaum = this.getAlleStrassenImRaum();

        var anzahlStrassentmp = this.getAnzahlZuBauendeStrassen(alleStrassenImRaum);

        //Wenn mehr als $anzahlStrassentmp strassen benutzt wurden
        if (nutzung.length > anzahlStrassentmp){
            //nutzung verkleinern, sonst haben wir falsche werte und mehr als $anzahlStrassen strassen
            nutzung = nutzung.splice(0, anzahlStrassentmp);
        }

        //Hole alle uberschneidungen aus beiden listen und loesche sie
        var ueberschneidungen = this.getUeberschneidungenVonZweiListen(nutzung,alleStrassenImRaum);
        var delNutzung = ueberschneidungen.delNutzung;
        var delAlleStrassenImRaum = ueberschneidungen.delAlleStrassenImRaum;
        this.loscheEintraegeInListe(nutzung,delNutzung);
        this.loscheEintraegeInListe(alleStrassenImRaum,delAlleStrassenImRaum);

        //Erstelle neue Strassen
        for (let i = 0; i < nutzung.length; i++){
            this.baueStrasse(nutzung[i].pos.x,nutzung[i].pos.y);
        }

        //zerstoere Strassen, die wir nicht mehr brauchen
        for (let i = 0; i < alleStrassenImRaum.length; i++){
            var istAutomatischGebaut = Game.getObjectById(alleStrassenImRaum[i].id).getEintragAusSpeicher("istAutomatischGebaut");
            if (istAutomatischGebaut != undefined && istAutomatischGebaut){
                this.strasseLoeschen(alleStrassenImRaum[i]);
            }
        }
        console.log("Strassen im Raum " + this.name + " wurden aktuallisiert");
        this.speichere("printAnzahlStrassen", true);
    }

    Room.prototype.getAnzahlZuBauendeStrassen = function(alleStrassenImRaum){
        var zuBauendeStrassen = anzahlStrassen;
        var anzahlAutoGebauteStrassen = 0;
        if (Memory.roadMemory != undefined) {
            anzahlAutoGebauteStrassen = Memory.roadMemory.length;
        }
        zuBauendeStrassen = zuBauendeStrassen - (alleStrassenImRaum.length - anzahlAutoGebauteStrassen);
        if (zuBauendeStrassen < 0) {
            zuBauendeStrassen = 0;
        }
        return zuBauendeStrassen;
    }

    /**
     * Strassen, die eben gerade gebaut wurden koennen nicht direkt angesprochen werden, weil sie erst im naechsten Tick tatsaechlich da sind.
     * Deswegen werden ihre koordinaten gespeichert und HIER dann hinzugefuegt.
     */
    Room.prototype.fuegeEbenErstellteStrassenInMemoryEin = function(){
        //Wenn im letzten Tick strassen gebaut wurden
        if (Memory.roadMemoryTMP != undefined){
            var geradeErstellteStrassen = Memory.roadMemoryTMP;
            for (let i = 0; i < geradeErstellteStrassen.length; i++){
                var dieseStrasse = geradeErstellteStrassen[i];
                var strasse = this.strasseFindenByPos(dieseStrasse.x,dieseStrasse.y);
                if (strasse != undefined){
                    //speicher, dass diese Strasse automatisch gebaut wurde
                    Game.getObjectById(strasse.id).speichere("istAutomatischGebaut",true);
                    Memory.roadMemoryTMP.splice(i,1);
                    --i;
                }
            }
            //Wenn die Liste dannach leer ist dann loesche die Liste
            if (Memory.roadMemoryTMP.length == 0){
                Memory.roadMemoryTMP = undefined;
            }
        }
    }

    /**
     * loescht eine Strasse, diese kann fertig gebaut oder noch im Bau sein
     * 
     * @param {*} strasse die Strasse, die geloscht werden soll
     */
    Room.prototype.strasseLoeschen = function(strasse){
        if (strasse.progress != undefined){
            if (Game.getObjectById(strasse.id).remove() < 0){
                console.log("Strasse konnte nicht removed werden: " + "x="+strasse.pos.x +" y="+strasse.pos.y);
            }else{
                Game.getObjectById(strasse.id).loscheGanzenSpeicher();
            }
        }else{
            if(Game.getObjectById(strasse.id).destroy()<0) {
                console.log("Strasse konnte nicht zerstoert werden: " + "x=" + strasse.pos.x + " y=" + strasse.pos.y);
            }else{
                Game.getObjectById(strasse.id).loscheGanzenSpeicher();
            }
        }
    }

    /**
     * Findet anhand von Koordinaten eine Strasse im Raum.
     * Es wird nach fertigen und noch nicht fertig gebauten strassen gesucht
     * 
     * @param {*} x die x-Koordinate
     * @param {*} y die y-Koordinate
     * @returns die Strasse, die sich hier befindet oder undefined wenn es dort keine gibt
     */
    Room.prototype.strasseFindenByPos = function(x,y){
        var b = this.find(FIND_CONSTRUCTION_SITES, {filter: (s) => s.structureType == STRUCTURE_ROAD && s.pos.x == x && s.pos.y == y});
        if (b !== undefined && b.length !== 0){
            if (b[0] !== undefined){
                b = b[0];
            }
            return b;
        }
        var a = this.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_ROAD && s.pos.x == x && s.pos.y == y});
        if (a !== undefined && a.length !== 0){
            if (a[0] !== undefined){
                a = a[0];
            }
            return a;
        }
        return undefined;
    }

    /**
     * Baut eine Strasse an gegebener stelle und veranlasst, dass im naechsten Tick durch die Funktion fuegeEbenErstellteStrassenInMemoryEin() 
     * diese Strasse auch in der Memory eingenommen wird und ein Parameter "istAutomatischGebaut" = true bekommt.
     * 
     * @param {*} x die x-Koordinate
     * @param {*} y die y-Koordinate
     */
    Room.prototype.baueStrasse = function(x,y){
        //Wenn strasse gebaut werden kann
        var errorCode = this.createConstructionSite(x, y, STRUCTURE_ROAD);
        if(errorCode >= 0){
            if (Memory.roadMemoryTMP == undefined){
                Memory.roadMemoryTMP = [];
            }
            Memory.roadMemoryTMP.push({x:[x], y:[y]});
        }else{
            console.log("Strasse konnte nicht gebaut werden: x="+x+" y="+y +" ErrorCode: " + errorCode);
        }
    }

    /**
     * loescht positions Eintrage aus einer liste 
     * 
     * @param {*} liste die Liste, aus der geloscht werden soll
     * @param {*} delEintraege eine Liste, in der Eintrage stehen, die aus liste geloscht werden sollen
     */
    Room.prototype.loscheEintraegeInListe = function(liste, delEintraege){
        //delNutz.sort((a, b) => a[0]-b[0]);
        for(let x = 0; x < delEintraege.length; x++){
            for(let i = 0; i < liste.length; i++){
                if(delEintraege[x].pos.x == liste[i].pos.x && delEintraege[x].pos.y == liste[i].pos.y){
                    liste.splice(i,1);
                    --i;
                }
            }
        }
    }

    /**
     * Schaut sich die Positionen von den Objekten innerhalb der Liste an und schreibt raus, wenn es gleiche Positionen gibt
     * 
     * @param {*} nutzung liste1, hier die Nutzung, die angibt welche Orte im Raum am haeufigsten benutzt wurden
     * @param {*} alleStrassenImRaum liste2, hier alleStrassenImRaum, eine Liste mit allen Strassen in diesem Raum
     * @returns Objekt. In delNutzung stehen die Eintrage von der liste1, die in liste2 vorkamen. und andersherum in der Variable delAlleStrassenImRaum.
     */
    Room.prototype.getUeberschneidungenVonZweiListen = function(nutzung, alleStrassenImRaum){
        var delNutz = [];
        var delAlleS = [];
        for(let i = 0; i < nutzung.length; i++){
            var nutzungEintrag = nutzung[i];
            for(let x = 0; x < alleStrassenImRaum.length; x++){
                var alleStrassenEintrag = alleStrassenImRaum[x];
                if(nutzungEintrag.pos.x == alleStrassenEintrag.pos.x && nutzungEintrag.pos.y == alleStrassenEintrag.pos.y){
                    delNutz.push(nutzungEintrag);
                    delAlleS.push(alleStrassenEintrag);
                }
            }
        }
        return {delNutzung: delNutz, delAlleStrassenImRaum: delAlleS};
    }
};