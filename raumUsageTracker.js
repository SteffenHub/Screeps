
module.exports = {

    run: function(){
        //Nur das erste mal
        if (Memory.raumUsage == undefined){
            Memory.raumUsage = new Array(49).fill(new Array(49).fill(0));
            Memory.ticksSeitStrassenUpdate = 0;
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


        //Nach 200 ticks strassen infrastruktur aktualisieren
        if (Memory.ticksSeitStrassenUpdate%400 == 0){
            //Liste von genutzten orten im Raum mit hauefigkeit
            var nutzung = this.getSortierteListe();
            //Liste aller fertigen strassen und nicht fertigen strassen im raum
            var alleStrassenImRaum = this.getAlleStrassenImRaum(raum);

            var anzahlStrassen = 60;
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
                raum.createConstructionSite(eintrag[1], eintrag[2], STRUCTURE_ROAD);
            }
            //zerstoere Strassen, die wir nicht mehr brauchen
            for (let i = 0; i < alleStrassenImRaum.length; i++){
                alleStrassenImRaum[i].remove();
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

    /**
     * Gibt eine Liste aller fertigen Strassen und nicht fertigen strassen aus
     */
    ,getAlleStrassenImRaum: function(raum){
        var nichtFertigeStrassen = raum.find(FIND_CONSTRUCTION_SITES, { filter: (s) => {return s.structureType == STRUCTURE_ROAD}});
        var fertigeStrassen = raum.find(FIND_STRUCTURES, { filter: (s) => {return s.structureType == STRUCTURE_ROAD}});
        return nichtFertigeStrassen.concat(fertigeStrassen);
    }
};