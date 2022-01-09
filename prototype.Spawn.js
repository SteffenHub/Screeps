module.exports = function() {

    /**
     * Wenn Energie voll ist wird ein Sammler gespawnt
     */
    StructureSpawn.prototype.spawnSammler = function(){
        var argumente = {role:'Sammler', arbeitet: false};
        this.creepErstellen(this.getBalancedKonfiguration(),argumente);
    };

    /**
     * Wenn Energie voll ist wird ein Distanz Sammler gespawnt
     */
    StructureSpawn.prototype.spawnDistanzSammler = function(zielRaum){
        var argumente = {role:'distanzSammler', 'arbeitet': false, 'hauptRaum': this.room.name, 'zielRaum': zielRaum};
        this.creepErstellen(this.getBalancedKonfiguration(),argumente);
    };

    /**
     * Wenn Energie voll ist wird ein Upgrader gespawnt
     */
    StructureSpawn.prototype.spawnUpgrader = function(){
        var argumente = {role:'Upgrader', arbeitet: false};
        this.creepErstellen(this.getBalancedKonfiguration(),argumente);
    };

    /**
     * Wenn Energie voll ist wird ein Bauerbeiter gespawnt
     */
    StructureSpawn.prototype.spawnBauerbeiter = function(){
        var argumente = {role:'Bauerbeiter', arbeitet: false};
        this.creepErstellen(this.getBalancedKonfiguration(),argumente);
    };

    /**
     * Wenn Energie voll ist wird ein mauer reparierer gespawnt
     */
    StructureSpawn.prototype.spawnMauerReparierer = function(){
        var argumente = {role:'mauerReparierer', arbeitet: false};
        this.creepErstellen(this.getBalancedKonfiguration(),argumente);
    };

    /**
     * Wenn genug Energie da ist wird ein Claimer gespawnt
     */
    StructureSpawn.prototype.spawnClaimer = function(zielRaum){
        var argumente = {role: 'Claimer', 'zielRaum': zielRaum};
        this.creepErstellen([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,MOVE],argumente);
    };

    StructureSpawn.prototype.spawnAngreifer = function(zielRaum){
        var argumente = {role: 'Angreifer', 'zielRaum': zielRaum};
        this.creepErstellen(this.getAngreiferKonfiguration(), argumente);
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
    StructureSpawn.prototype.creepErstellen = function(konfiguration, argumente){
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
                raumEnergie -= 100;
                if (raumEnergie < 0){
                    raumEnergie += 100;
                }else {
                    konfigurationTmp.push(0);
                }
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

    StructureSpawn.prototype.getAngreiferKonfiguration = function(){
        var raumEnergie = this.room.energyCapacityAvailable;
        var konfigurationTmp = [];
        var lauf = 1;
        while (raumEnergie >= 50){
            if (lauf == 1){
                raumEnergie -= 80;
                if (raumEnergie < 0){
                    raumEnergie += 80;
                }else {
                    konfigurationTmp.push(0);
                }
            }else if (lauf == 2){
                raumEnergie -= 50;
                if (raumEnergie < 0){
                    raumEnergie += 50;
                }else {
                    konfigurationTmp.push(1);
                }
                lauf = 0;
            }
            ++lauf;
        }
        while (raumEnergie > 0){
            raumEnergie -= 10;
            if (raumEnergie < 0){
                raumEnergie += 10;
            }else {
                konfigurationTmp.push(2);
            }
        }

        var angriffCount = 0;
        var toughCount = 0;
        var moveCount = 0;
        for (let konf of konfigurationTmp){
            if (konf == 0){
                ++angriffCount;
            }else if (konf == 1){
                ++moveCount;
            }else {
                ++toughCount;
            }
        }

        var konfiguration = [];
        for (let i = 0; i < toughCount; i++) {
            konfiguration.push(TOUGH);
        }
        for (let i = 1; i < angriffCount; i++) {
            konfiguration.push(ATTACK);
        }
        for (let i = 0; i < moveCount; i++) {
            konfiguration.push(MOVE);
        }
        konfiguration.push(ATTACK);

        return konfiguration;
    };
};