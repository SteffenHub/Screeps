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
};