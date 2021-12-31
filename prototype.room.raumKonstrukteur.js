require('prototype.Room.speicherVerwaltung')();
require('prototype.road.SpeicherVerwaltung')();
require('prototype.constructionSite.road.speicherVerwaltung')();

module.exports = function(){

    var anzahlStrassen = 80;
    var ticksZumUpdate = 600;

    /**
     * Kuemmert sich darum, dass in dem Raum Strassen gebaut werden, die anhand der Benutzung berechnet werden
     * Nur alle $ticksZumUpdate Ticks, und baut nur $anzahlStrassen Strassen.
     * Strassen, die mauell gebaut wurden werden nicht zerstoert
     */
    Room.prototype.baueStrassen = function(){

        this.fuegeEbenErstellteStrassenInMemoryEin();

        //Erst Nach 600 ticks strassen infrastruktur aktualisieren
        if (this.getSpeicher().ticksSeitStrassenUpdate%ticksZumUpdate != 0){
            return;
        }

        //Liste von genutzten orten im Raum mit hauefigkeit
        var nutzung = this.getSortierteListe();
        //Liste aller fertigen strassen und nicht fertigen strassen im raum
        var alleStrassenImRaum = this.getAlleStrassenImRaum();
        
        //Wenn weniger als $anzahlStrassen strassen benutzt wurden
        if (nutzung.length <= anzahlStrassen){
            anzahlStrassen = nutzung.length;
        }else{
            //nutzung verkleinern, sonst haben wir falsche werte und mehr als $anzahlStrassen strassen
            nutzung = nutzung.splice(0, anzahlStrassen);
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
                console.log("Es existieren derzeit "+ this.getAlleStrassenImRaum().length+" Strassen im Raum " + this.name);
            }
        }
    }

    /**
     * loescht eine Strasse, diese kann fertig gebaut oder noch im Bau sein
     * 
     * @param {*} strasse die Strasse, die geloscht werden soll
     */
    Room.prototype.strasseLoeschen = function(strasse){
        Game.getObjectById(strasse.id).loscheGanzenSpeicher();
        if (strasse.progress != undefined){
            Game.getObjectById(strasse.id).remove();
        }else{
            Game.getObjectById(strasse.id).destroy();
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
        if(this.createConstructionSite(x, y, STRUCTURE_ROAD) >= 0){
            if (Memory.roadMemoryTMP == undefined){
                Memory.roadMemoryTMP = [];
            }
            Memory.roadMemoryTMP.push({x:[x], y:[y]});
        }else{
            console.log("Strasse konnte nicht gebaut werden: x="+x+" y="+y)
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

    /**
     * Gibt eine Liste aus, in der steht wie oft creeps ueber einen Ort im Raum gegangen sind
     * Struktur: Liste aus Objekten mit variablen: {hauefigkeit,pos:{x,y}}
     */
    Room.prototype.getSortierteListe = function(){
        var sortList = [];
        for (let x = 0; x < this.getSpeicher().usage.length; x++){
            for (let y = 0; y < this.getSpeicher().usage[x].length; y++){
                var value = this.getSpeicher().usage[x][y];
                if (value > 0){
                    sortList.push({hauefigkeit:value, pos: {x:x, y:y}});
                }
            }
        }
        sortList.sort((a, b) => -a.hauefigkeit+b.hauefigkeit);
        return sortList;
    }

    /**
     * Gibt eine Liste aller fertigen Strassen und nicht fertigen strassen aus
     */
    Room.prototype.getAlleStrassenImRaum = function(){
        var nichtFertigeStrassen = this.find(FIND_CONSTRUCTION_SITES, { filter: (s) => {return s.structureType == STRUCTURE_ROAD}});
        var fertigeStrassen = this.find(FIND_STRUCTURES, { filter: (s) => {return s.structureType == STRUCTURE_ROAD}});
        return nichtFertigeStrassen.concat(fertigeStrassen);
    }
};