
module.exports = function() {

    Creep.prototype.holeEnergie = function(){
        var energy = this.pos.findClosestByPath(FIND_SOURCES);
        if (this.harvest(energy) == ERR_NOT_IN_RANGE){
            this.moveTo(energy);
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