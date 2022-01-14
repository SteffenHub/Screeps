
module.exports = function() {

    /**
     * Wenn Energie voll ist wird ein Sammler gespawnt
     */
    StructureSpawn.prototype.spawnSammler = function(){
        if (!this.checkRoomEnergieIsFull()){
            return;
        }
        var argumente = {role:'Sammler',hauptRaum: this.room.name, arbeitet: false};
        this.creepErstellen(this.getProzentKonfiguration(this.room.energyCapacityAvailable,
                                                    [{name: WORK, prozent: 41},
                                                            {name: CARRY, prozent: 33},
                                                            {name: MOVE, prozent: 25}]),
                                                            argumente);
    };

    /**
     * Wenn Energie voll ist wird ein Distanz Sammler gespawnt
     */
    StructureSpawn.prototype.spawnDistanzSammler = function(zielRaum){
        if (!this.checkRoomEnergieIsFull()){
            return;
        }
        var argumente = {role:'distanzSammler', 'arbeitet': false, hauptRaum: this.room.name, 'zielRaum': zielRaum};
        this.creepErstellen(this.getProzentKonfiguration(this.room.energyCapacityAvailable,
                                                    [{name: WORK, prozent: 20},
                                                            {name: CARRY, prozent: 50},
                                                            {name: MOVE, prozent: 30}]),
                                                            argumente);
    };

    /**
     * Wenn Energie voll ist wird ein Distanz Sammler gespawnt
     */
    StructureSpawn.prototype.spawnDistanzSammler = function(zielRaum, geheDurchRaum){
        if (!this.checkRoomEnergieIsFull()){
            return;
        }
        var argumente = {role:'distanzSammler', 'arbeitet': false, hauptRaum: this.room.name, 'geheDurchRaum':geheDurchRaum, 'zielRaum': zielRaum};
        this.creepErstellen(this.getProzentKonfiguration(this.room.energyCapacityAvailable,
                                                    [{name: WORK, prozent: 20},
                                                            {name: CARRY, prozent: 50},
                                                            {name: MOVE, prozent: 30}]),
                                                            argumente);
    };

    /**
     * Wenn Energie voll ist wird ein Upgrader gespawnt
     */
    StructureSpawn.prototype.spawnUpgrader = function(){
        if (!this.checkRoomEnergieIsFull()){
            return;
        }
        var argumente = {role:'Upgrader',hauptRaum: this.room.name, arbeitet: false};
        this.creepErstellen(this.getProzentKonfiguration(this.room.energyCapacityAvailable,
                                                    [{name: WORK, prozent: 20},
                                                            {name: CARRY, prozent: 40},
                                                            {name: MOVE, prozent: 40}]),
                                                            argumente);
    };

    /**
     * Wenn Energie voll ist wird ein Bauerbeiter gespawnt
     */
    StructureSpawn.prototype.spawnBauerbeiter = function(){
        if (!this.checkRoomEnergieIsFull()){
            return;
        }
        var argumente = {role:'Bauerbeiter',hauptRaum: this.room.name, arbeitet: false};
        this.creepErstellen(this.getProzentKonfiguration(this.room.energyCapacityAvailable,
                                                    [{name: WORK, prozent: 33},
                                                            {name: CARRY, prozent: 33},
                                                            {name: MOVE, prozent: 33}]),
                                                            argumente);
    };

    /**
     * Wenn Energie voll ist wird ein mauer reparierer gespawnt
     */
    StructureSpawn.prototype.spawnMauerReparierer = function(){
        if (!this.checkRoomEnergieIsFull()){
            return;
        }
        var argumente = {role:'mauerReparierer',hauptRaum: this.room.name, arbeitet: false};
        this.creepErstellen(this.getProzentKonfiguration(this.room.energyCapacityAvailable,
                                                    [{name: WORK, prozent: 33},
                                                            {name: CARRY, prozent: 33},
                                                            {name: MOVE, prozent: 33}]),
                                                            argumente);
    };

    /**
     * Wenn genug Energie da ist wird ein Claimer gespawnt
     */
    StructureSpawn.prototype.spawnClaimer = function(zielRaum){
        if (!this.checkRoomEnergieIsFull()){
            return;
        }
        var argumente = {role: 'Claimer', hauptRaum: this.room.name, 'zielRaum': zielRaum};
        this.creepErstellen([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,MOVE],argumente);
    };

    /**
     * Wenn Energie voll ist wird ein Angreifer gespawnt
     */
    StructureSpawn.prototype.spawnAngreifer = function(zielRaum){
        if (!this.checkRoomEnergieIsFull()){
            return;
        }
        var argumente = {role: 'Angreifer', hauptRaum: this.room.name, 'zielRaum': zielRaum};
        this.creepErstellen(this.getProzentKonfiguration(this.room.energyCapacityAvailable,
                                                    [{name: TOUGH, prozent: 3},
                                                            {name: MOVE, prozent: 43},
                                                            {name: ATTACK, prozent: 54}]),
                                                            argumente);
    };

    /**
     * Wenn Energie voll ist wird ein DistantUpgrader gespawnt
     */
    StructureSpawn.prototype.spawnDistanzUpgrader = function(zielRaum){
        if (!this.checkRoomEnergieIsFull()){
            return;
        }
        var argumente = {role: 'distanzUpgrader', hauptRaum: this.room.name, 'zielRaum': zielRaum};
        this.creepErstellen(this.getProzentKonfiguration(this.room.energyCapacityAvailable,
                                                    [{name: WORK, prozent: 20},
                                                            {name: CARRY, prozent: 50},
                                                            {name: MOVE, prozent: 30}]),
                                                            argumente);
    };





    /**                         **\
     *                           *
     *                           *
     *      PRIVATE METHODEN     *
     *                           *
     *                           *
    \*                           */


    /**
     * Gibt aus, ob der Raum volle Energie hat(Extensions und Spawn voll)
     *
     * @returns {boolean} ist der Raum voll
     */
    StructureSpawn.prototype.checkRoomEnergieIsFull = function (){
        if (this.room.energyAvailable == this.room.energyCapacityAvailable){
            return true;
        }
        return false;
    };

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
     * Baut eine Konfiguration fuer einen Creep zusammen.
     * Indem eine prozentuale Verteilung der Teile angeben wird
     *
     * @param verfuegbareEnergie wie viel Energie darf diese Konfiguration kosten
     * @param aufbau welche Teile soll die Konfiguration haben und mit wie viel Prozent sollen diese eingebaut werden (z.B. aufbau = [{name: WORK, prozent: 40},{name: CARRY, prozent: 30}, ...])
     * @returns {[]|undefined} die Konfiguration, die moeglichst na an der Prozent verteilung liegt. Oder undefined falls nicht moeglich(zu wenig Energie)
     */
    StructureSpawn.prototype.getProzentKonfiguration = function(verfuegbareEnergie,aufbau){
        var verfuegbareEnergie = verfuegbareEnergie;
        var verbrauchteEnergie = 0;
        var konfigurationTmp = [];

        //alles einmal rein
        for (let i = 0; i < aufbau.length; i++) {
            konfigurationTmp.push(1);
            verbrauchteEnergie += this.getKostenVonTeil(aufbau[i].name);
        }
        //pruefe, ob es ueberhaupt moeglich ist mit dieser verfuegbaren Energie eine konfiguration zu bauen
        if (verbrauchteEnergie > verfuegbareEnergie){
            return undefined;
        }

        while (verbrauchteEnergie != verfuegbareEnergie){
            //berechnen wie viele teile gerade drin sind
            var parts = 0;
            for (let i = 0; i < konfigurationTmp.length; i++) {
                parts += konfigurationTmp[i];
            }

            //berechnen, wie weit die aktuelle Konfiguration von der erwartung entfernt ist
            var abweichungen = [];
            for (let i = 0; i < konfigurationTmp.length; i++) {
                abweichungen.push({abweichung: aufbau[i].prozent - ((konfigurationTmp[i]/parts)*100), teil: i});
            }

            //abweichungen sortieren, um groeeste Abweichung zu bevorzugen
            abweichungen.sort((a, b) => -a.abweichung+b.abweichung);

            //die aktuelle Konfiguration erweitern
            var konfErweitert = false;
            for (let i = 0; i < abweichungen.length; i++) {
                //kosten fuer diese erweiterung
                var cost = this.getKostenVonTeil(aufbau[abweichungen[i].teil].name);
                //Wenn diese Erweiterung noch rein passt. Sonst mit der naechsten mit groesster abweichung probieren
                if (verbrauchteEnergie + cost <= verfuegbareEnergie){
                    verbrauchteEnergie += cost;
                    ++konfigurationTmp[abweichungen[i].teil];
                    konfErweitert = true;
                    break;
                }
            }

            //Wenn die aktuelle Konfiguration NICHT erweitert wurde -> mehr kann nicht hinzugefuegt werden
            if (!konfErweitert){
                break;
            }
        }

        //die Konfiguration zsm. stellen
        konfiguration = [];
        for (let i = 0; i < konfigurationTmp.length; i++) {
            for (let j = 0; j < konfigurationTmp[i]; j++) {
                konfiguration.push(aufbau[i].name);
            }
        }

        return konfiguration;
    };

    /**
     * gibt die Energie Kosten fuer ein Koerperteil vom Creep aus
     *
     * @param teil fuer welches Koerperteil (z.B. MOVE)
     * @returns {undefined|number} die kosten fuer das Teil
     */
    StructureSpawn.prototype.getKostenVonTeil = function(teil){
        if (teil == WORK){
            return 100;
        }
        if (teil == CARRY){
            return 50;
        }
        if (teil == MOVE){
            return 50;
        }
        if (teil == ATTACK){
            return 80;
        }
        if (teil == RANGED_ATTACK){
            return 150;
        }
        if (teil == HEAL){
            return 250;
        }
        if (teil == CLAIM){
            return 600;
        }
        if (teil == TOUGH){
            return 10;
        }
        return undefined;
    }
};