
module.exports = function(){

    StructureTower.prototype.run = function(){
        var gegner = this.sucheGegner();
        if (gegner != undefined){
            this.attack(gegner);
        }
    };

    StructureTower.prototype.sucheGegner(){
        return this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    };

};