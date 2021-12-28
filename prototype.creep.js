
module.exports = function() {

    Creep.prototype.holeEnergie = function(){
        //Erstmal nach richtigen Energie sourcen suchen
        var energy = this.pos.findClosestByPath(FIND_SOURCES, {filter: (s) => s.energy > 0});
        if(energy != undefined){
            if (this.harvest(energy) == ERR_NOT_IN_RANGE){
                this.moveTo(energy);
            }
        //Dann nach dropped sources suchen    
        }else{
            var droppedEnergy = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: (s) => s.energy > 0});
            if (droppedEnergy != undefined){
                if(this.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                    this.moveTo(droppedEnergy);
                }
            //Dann nach grabsteinen suchen    
            }else{
                var tombstone = this.pos.findClosestByPath(FIND_TOMBSTONES, {filter: (t) => t.store.energy > 0});
                //Wenn es eine Liste ist(mehr als ein Grabstein)
                if (tombstone[0] != undefined){
                    tombstone = tombstone[0];
                }
                if (tombstone != undefined){
                    if(this.withdraw(tombstone,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(tombstone);
                    }
                //Dann nach ruinen suchen    
                }else{
                    var ruine = this.pos.findClosestByPath(FIND_RUINS, {filter: (r) => r.store.energy > 0});
                    //Wenn es eine Liste ist(mehr als eine ruine)
                    if (ruine[0] != undefined){
                        ruine = ruine[0];
                    }
                    //TODO for?
                    if(this.withdraw(ruine,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(ruine);
                    }
                }
            }
        }
    };

    Creep.prototype.arbeitet = function(){
        //Wenn Energie voll
        if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            this.memory.arbeitet = true;
        }
        //Wenn Energie leer
        else if (this.store.getFreeCapacity(RESOURCE_ENERGY) == this.store.getCapacity(RESOURCE_ENERGY)){
            this.memory.arbeitet = false;
        }
        return this.memory.arbeitet;
    };

    Creep.prototype.energieAbgeben = function(ziel){
        if(this.transfer(ziel, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            this.moveTo(ziel);
        }
    };

};