require('prototype.Room.speicherVerwaltung')();
module.exports = function(){

    Room.prototype.trackUsage = function(){

        //Nur das erste mal -> initalisieren
        if (this.getSpeicher() === undefined || this.getEintragAusSpeicher("usage") === undefined){
            this.speichere("usage", new Array(50).fill(new Array(50).fill(0)));
            this.speichere("ticksSeitStrassenUpdate", 0);
            //Diesen Tick nichts mehr machen, sonst raumUsage ist noch undefined
            return;
        }
        //Bei allen Creeps schauen, ob sie sich bewegt haben
        for (let name in Game.creeps){
            var creep = Game.creeps[name];
            //Nur das erste mal
            if (creep.memory.letztePos === undefined){
                creep.memory.letztePos = creep.pos;
                continue;
            }
            //Wenn dieser creep nicht in diesem Raum ist
            if(creep.room.name != this.name){
                continue;
            }
            //Wenn der creep sich bewegt hat
            if(creep.memory.letztePos.x !== creep.pos.x || creep.memory.letztePos.y !== creep.pos.y){
                creep.memory.letztePos = creep.pos;
                ++this.getEintragAusSpeicher("usage")[creep.pos.x][creep.pos.y];
            }
        }

        //ticks erhoehen 
        this.speichere("ticksSeitStrassenUpdate", this.getEintragAusSpeicher("ticksSeitStrassenUpdate") + 1);

        //getrackte Daten zuruecksetzen
        if (this.getEintragAusSpeicher("ticksSeitStrassenUpdate") > 4500){
            this.loscheEintragImSpeicher("usage");
            this.loscheEintragImSpeicher("ticksSeitStrassenUpdate");
        }
    }

    /**
     * Gibt eine Liste aus, in der steht wie oft creeps ueber einen Ort im Raum gegangen sind.(ORTE 0 & 49 NICHT MIT DRIN)
     * Der erste Eintrag ist dabei der am meisten besuchte Ort
     * Struktur: Liste aus Objekten mit variablen: {hauefigkeit,pos:{x,y}}
     */
    Room.prototype.getUsageSortierteListe = function(){
        var sortList = [];
        for (let x = 1; x < this.getSpeicher().usage.length-1; x++){
            for (let y = 1; y < this.getSpeicher().usage[x].length-1; y++){
                var value = this.getSpeicher().usage[x][y];
                if (value > 0){
                    sortList.push({hauefigkeit:value, pos: {x:x, y:y}});
                }
            }
        }
        sortList.sort((a, b) => -a.hauefigkeit+b.hauefigkeit);
        return sortList;
    }
};