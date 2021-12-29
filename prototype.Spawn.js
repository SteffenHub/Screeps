module.exports = function() {

    /**
     * Wenn Energie voll ist wird ein Sammler gespawnt
     */
    StructureSpawn.prototype.spawnSammler = function(){
        var argumente = {role:'Sammler', arbeitet: false};
        this.spawnCreep(this.getBalancedKonfiguration(),argumente);
    };

    /**
     * Wenn Energie voll ist wird ein Upgrader gespawnt
     */
    StructureSpawn.prototype.spawnUpgrader = function(){
        var argumente = {role:'Upgrader', arbeitet: false};
        this.spawnCreep(this.getBalancedKonfiguration(),argumente);
    };

    /**
     * Wenn Energie voll ist wird ein Bauerbeiter gespawnt
     */
    StructureSpawn.prototype.spawnBauerbeiter = function(){
        var argumente = {role:'Bauerbeiter', arbeitet: false};
        this.spawnCreep(this.getBalancedKonfiguration(),argumente);
    };







    /**                         **\
     *                           *
     *                           *
     *      PRIVATE METHODEN     *
     *                           *
     *                           *
    \*                           */






    /**
     * Spawnt einen Creep mit gegebener Konfiguration und argumenten
     * 
     * @param {*} konfiguration die Konfiguration, wie der Creep aufgebaut werden soll
     * @param {*} argumente die Argumente, die der Creep in seinem Speicher tragen soll
     */
    StructureSpawn.prototype.spawnCreep = function(konfiguration,argumente){
        this.createCreep(konfiguration, undefined, argumente);
    };

    /**
     * Gibt einen Creep aus, der moeglichste ausgeglichen ist.
     * Dabei folgende Hierarchi(WORK,CARRY,MOVE)
     * 
     * @returns ein Array mit der Konfiguration
     */
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