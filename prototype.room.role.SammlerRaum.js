require("./prototype.Source")();
require("./prototype.room.suchen")();
require("./prototype.room.roles")();

module.exports = function () {

    /**
     * Fuehrt den Sammler Raum aus um seine Aufgaben zu erfuellen
     */
    Room.prototype.runSammlerRaum = function () {
        //Wenn Grundstruktur gelegt
        if (this.kuemmereUmGrundStruktur()) {
            //Dann zusaetzliche Upgrader und Bauerbeiter spawnen
            if (_.sum(Game.creeps, (c) => c.memory.role == 'Upgrader' && c.memory.hauptRaum == this.name) < 2) {
                this.Spawns()[0].spawnUpgrader();
            } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Bauerbeiter' && c.memory.hauptRaum == this.name) < 6) {
                this.Spawns()[0].spawnBauerbeiter();
            }
        }
        //Die Aufgaben machen, die mit dem derzeitigen Controller Level zu tun sind
        this.manageController();
    };

    /**
     * Laesst den Sammler Raum das tun, was er mit Controller Level 1 tun soll
     */
    Room.prototype.manageSammlerRaumControllerLvl1 = function () {
    }

    /**
     * Laesst den Sammler Raum das tun, was er mit Controller Level 2 tun soll
     */
    Room.prototype.manageSammlerRaumControllerLvl2 = function () {
    }

    /**
     * Laesst den Sammler Raum das tun, was er mit Controller Level 3 tun soll
     */
    Room.prototype.manageSammlerRaumControllerLvl3 = function () {
    }

    /**
     * Laesst den Sammler Raum das tun, was er mit Controller Level 4 tun soll
     */
    Room.prototype.manageSammlerRaumControllerLvl4 = function () {
    }

    /**
     * Laesst den Sammler Raum das tun, was er mit Controller Level 5 tun soll
     */
    Room.prototype.manageSammlerRaumControllerLvl5 = function () {
    }

    /**
     * Laesst den Sammler Raum das tun, was er mit Controller Level 6 tun soll
     */
    Room.prototype.manageSammlerRaumControllerLvl6 = function () {
    }

    /**
     * Laesst den Sammler Raum das tun, was er mit Controller Level 7 tun soll
     */
    Room.prototype.manageSammlerRaumControllerLvl7 = function () {
    }

    /**
     * Laesst den Sammler Raum das tun, was er mit Controller Level 8 tun soll
     */
    Room.prototype.manageSammlerRaumControllerLvl8 = function () {
    }

    /**
     * Ruft den jeweiligen code auf, der zum Aufgaben erfuellen mit derzeitigen Controller Level zu tun sind
     */
    Room.prototype.manageController = function () {
        var controllerLevel = this.getControllerLevel();
        switch (controllerLevel) {
            case 1:
                this.manageSammlerRaumControllerLvl1();
                break;
            case 2:
                this.manageSammlerRaumControllerLvl2();
                break;
            case 3:
                this.manageSammlerRaumControllerLvl3();
                break;
            case 4:
                this.manageSammlerRaumControllerLvl4();
                break;
            case 5:
                this.manageSammlerRaumControllerLvl5();
                break;
            case 6:
                this.manageSammlerRaumControllerLvl6();
                break;
            case 7:
                this.manageSammlerRaumControllerLvl7();
                break;
            case 8:
                this.manageSammlerRaumControllerLvl8();
                break;
        }
    }
};