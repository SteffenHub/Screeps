
module.exports = function() {

    StructureSpawn.prototype.spawnSammler = function(){
        //var konfiguration = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
        var argumente = {role:'Sammler', arbeitet: false};
        this.spawnCreep(this.getBalancedKonfiguration(),argumente);
    };

    StructureSpawn.prototype.spawnUpgrader = function(){
        //var konfiguration = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        var argumente = {role:'Upgrader', arbeitet: false};
        this.spawnCreep(this.getBalancedKonfiguration(),argumente);
    };

    StructureSpawn.prototype.spawnBauerbeiter = function(){
        //var konfiguration = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        var argumente = {role:'Bauerbeiter', arbeitet: false};
        this.spawnCreep(this.getBalancedKonfiguration(),argumente);
    };


    /**
     * private Methods
     */
    StructureSpawn.prototype.spawnCreep = function(konfiguration,argumente){
        this.createCreep(konfiguration, undefined, argumente);
    };

    StructureSpawn.prototype.getBalancedKonfiguration = function(){
        var raumEnergie = this.room.energyCapacityAvailable;
        var konfigurationTmp = [];
        var lauf = 1;
        while (raumEnergie > 0){
            if (lauf == 1){
                konfigurationTmp.push(0);
                raumEnergie -= 100;
            }else if (lauf == 2){
                konfigurationTmp.push(1);
                raumEnergie -= 50;
            }else if (lauf == 3){
                konfigurationTmp.push(2);
                raumEnergie -= 50;
                lauf = 0;
            }
            ++lauf;
        }

        var workCount = 0;
        var carryCount = 0;
        var moveCount = 0;
        for (let konf of konfigurationTmp){
            if (konf == 0){
                ++workCount;
            }else if (konf == 1){
                ++carryCount;
            }else {
                ++moveCount;
            }
        }

        var konfiguration = [];
        for (let i = 0; i < workCount; i++) {
            konfiguration.push(WORK);
        }
        for (let i = 0; i < carryCount; i++) {
            konfiguration.push(CARRY);
        }
        for (let i = 0; i < moveCount; i++) {
            konfiguration.push(MOVE);
        }

        return konfiguration;
    };

};