
module.exports = function() {

    StructureSpawn.prototype.spawnSammler = function(){
        var konfiguration = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
        var argumente = {role:'Sammler', arbeitet: false};
        this.namespawnCreep(konfiguration,argumente);
    };

    StructureSpawn.prototype.spawnUpgrader = function(){
        var konfiguration = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        var argumente = {role:'Upgrader', arbeitet: false};
        this.spawnCreep(konfiguration,argumente);
    };

    StructureSpawn.prototype.spawnBauerbeiter = function(){
        var konfiguration = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        var argumente = {role:'Bauerbeiter', arbeitet: false};
        this.spawnCreep(konfiguration,argumente);
    };


    /**
     * private
     */
    StructureSpawn.prototype.spawnCreep = function(konfiguration,argumente){
        this.createCreep(konfiguration, undefined, argumente);
    };

};