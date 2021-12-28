const { isEmpty } = require("lodash");
require('prototype.road.SpeicherVerwaltung')();
require('prototype.constructionSite.road')();

module.exports = {

    run: function(){
        //Nur das erste mal
        if (Memory.raumUsage == undefined){
            Memory.raumUsage = new Array(49).fill(new Array(49).fill(0));
            Memory.ticksSeitStrassenUpdate = 0;
            //Memory.automatischGebauteStrassen = [];
        }
        for (let name in Game.creeps){
            var creep = Game.creeps[name];
            //Nur das erste mal
            if (creep.memory.letztePos == undefined){
                creep.memory.letztePos = creep.pos;
                return;
            }
            //Wenn der creep sich bewegt hat
            if(creep.memory.letztePos.x != creep.pos.x || creep.memory.letztePos.y != creep.pos.y){
                creep.memory.letztePos = creep.pos;
                ++Memory.raumUsage[creep.pos.x][creep.pos.y];
            }
        }
    }

    ,baueStrassen: function(raum){
        ++Memory.ticksSeitStrassenUpdate;    
        this.fuegeEbenErstellteStrassenInMemoryEin(raum); 

        //Zum zuruecksetzen
        /*
        var alleStrassenImRaum = this.getAlleStrassenImRaum(raum);
        for (let i = 0; i < alleStrassenImRaum.length; i++){
            if (!(alleStrassenImRaum[i].pos.x == 10 && alleStrassenImRaum[i].pos.y == 30) && !(alleStrassenImRaum[i].pos.x == 12 && alleStrassenImRaum[i].pos.y == 32) && !(alleStrassenImRaum[i].pos.x == 11 && alleStrassenImRaum[i].pos.y == 33)){
                Game.getObjectById(alleStrassenImRaum[i].id).speichere("istAutomatischGebaut", true);
            }
        }
        */


        //Nach 200 ticks strassen infrastruktur aktualisieren
        if (Memory.ticksSeitStrassenUpdate%2 == 0){
            //Liste von genutzten orten im Raum mit hauefigkeit
            var nutzung = this.getSortierteListe();

            //Liste aller fertigen strassen und nicht fertigen strassen im raum
            var alleStrassenImRaum = this.getAlleStrassenImRaum(raum);
            console.log("Es existieren derzeit "+ alleStrassenImRaum.length+" Strassen im Raum " + raum.name);
            
            var anzahlStrassen = 90;
            //Wenn weniger als $anzahlStrassen strassen benutzt wurden
            if (nutzung.length <= anzahlStrassen){
                anzahlStrassen = nutzung.length;
            }else{
                //nutzung verkleinern, sonst haben wir falsche werte und mehr als $anzahlStrassen strassen
                nutzung = nutzung.splice((nutzung.length-anzahlStrassen), nutzung.length);
            }

            //Loesche alle uberschneidungen aus beiden listen
            var delNutz = [];
            var delAlleS = [];
            for(let i = 0; i < nutzung.length; i++){
                var nutzungEintrag = nutzung[i];
                for(let x = 0; x < alleStrassenImRaum.length; x++){
                    var alleStrassenEintrag = alleStrassenImRaum[x];
                    if(nutzungEintrag[1] == alleStrassenEintrag.pos.x && nutzungEintrag[2] == alleStrassenEintrag.pos.y){
                        delNutz.push(nutzungEintrag);
                        delAlleS.push(alleStrassenEintrag);
                    }
                }
            }
            //delNutz = delNutz.filter((v, i, a) => a.indexOf(v) === i);
            //delNutz.sort((a, b) => a[0]-b[0]);
            for(let i = 0; i < delNutz.length; i++){
                nutzung.splice(nutzung.indexOf(delNutz[i]),1);
            }
            //delAlleS = delAlleS.filter((v, i, a) => a.indexOf(v) === i);
            //delAlleS.sort((a, b) => a[0]-b[0]);
            for(let i = 0; i < delAlleS.length; i++){
                alleStrassenImRaum.splice(alleStrassenImRaum.indexOf(delAlleS[i]),1);
            }

            //Erstelle neue Strassen
            for (let i = 0; i < nutzung.length; i++){
                var eintrag = nutzung[i];
                this.baueStrasse(eintrag[1],eintrag[2],raum);
            }
            //zerstoere Strassen, die wir nicht mehr brauchen
            for (let i = 0; i < alleStrassenImRaum.length; i++){
                var speicher = Game.getObjectById(alleStrassenImRaum[i].id).getSpeicher();
                if (speicher != undefined){
                    if (speicher.istAutomatischGebaut){
                        this.strasseLoeschen(alleStrassenImRaum[i]);
                    }
                }
            }
        }

        //Alle Daten zuruecksetzen
        if (Memory.ticksSeitStrassenUpdate > 2500){
            Memory.raumUsage = undefined;
        }
    }

    /**
     * Gibt eine Liste aus, in der steht wie oft creeps ueber einen Ort im Raum gegangen sind
     * Struktur: [anzahlSchritteAufDiesemFeld,x,y]
     */
    ,getSortierteListe: function(){
        var sortList = [];
        for (let x = 0; x < Memory.raumUsage.length; x++){
            for (let y = 0; y < Memory.raumUsage[x].length; y++){
                var value = Memory.raumUsage[x][y];
                if (value > 0){
                    sortList.push([value,x,y]);
                }
            }
        }
        sortList.sort((a, b) => a[0]-b[0]);
        return sortList;
    }

    ,baueStrasse: function(x,y,raum){
        raum.createConstructionSite(x, y, STRUCTURE_ROAD);
        var strasse = this.strasseFindenByPos(x,y,raum);
        if (strasse != undefined){
            Game.getObjectById(strasse.id).speichere("istAutomatischGebaut",true);
        }else{
            if (Memory.roadMemoryTMP == undefined){
                Memory.roadMemoryTMP = [];
            }
            Memory.roadMemoryTMP.push({x:[x], y:[y]});
            //console.log("Die Strasse an Position (" + x+","+y+") im Raum "+ raum.name + " wurde nicht gefunden");
        }
    }

    ,fuegeEbenErstellteStrassenInMemoryEin: function(raum){
        if (Memory.roadMemoryTMP != undefined){
            var geradeErstellteStrassen = Memory.roadMemoryTMP;
            for (let i = 0; i < geradeErstellteStrassen.length; i++){
                var dieseStrasse = geradeErstellteStrassen[i];
                var strasse = this.strasseFindenByPos(dieseStrasse.x,dieseStrasse.y,raum);
                if (strasse != undefined){
                    Game.getObjectById(strasse.id).speichere("istAutomatischGebaut",true);
                    Memory.roadMemoryTMP.splice(i,1);
                    --i;
                }
            }
        }
        if (isEmpty(Memory.roadMemoryTMP)){
            Memory.roadMemoryTMP = undefined;
        }
    }

    /**
     * Gibt eine Liste aller fertigen Strassen und nicht fertigen strassen aus
     */
    ,getAlleStrassenImRaum: function(raum){
        var nichtFertigeStrassen = raum.find(FIND_CONSTRUCTION_SITES, { filter: (s) => {return s.structureType == STRUCTURE_ROAD}});
        var fertigeStrassen = raum.find(FIND_STRUCTURES, { filter: (s) => {return s.structureType == STRUCTURE_ROAD}});
        return nichtFertigeStrassen.concat(fertigeStrassen);
    }

    ,strasseFindenByPos: function(x,y,raum){
        var b = raum.find(FIND_CONSTRUCTION_SITES, {filter: (s) => s.structureType == STRUCTURE_ROAD && s.pos.x == x && s.pos.y == y && s.pos.roomName == raum.name});
        if (b != undefined && !isEmpty(b)){
            if (b[0] != undefined){
                b = b[0];
            }
            return b;
        }
        var a = raum.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_ROAD && s.pos.x == x && s.pos.y == y && s.pos.roomName == raum.name});
        if (a != undefined && !isEmpty(a)){
            if (a[0] != undefined){
                a = a[0];
            }
            return a;
        }
        return undefined;
    }

    ,strasseLoeschen: function(strasse){
        Game.getObjectById(strasse.id).loscheGanzenSpeicher();
        if (strasse.progress != undefined){
            Game.getObjectById(strasse.id).remove();
        }else{
            Memory.tmp = Game.getObjectById(strasse.id);
            Game.getObjectById(strasse.id).destroy();
        }
        
    }

};