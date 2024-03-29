require('prototype.Spawn')();
require('prototype.room.usageTracker')();
require('prototype.room.raumKonstrukteur')();
require('prototype.Tower')();
require('prototype.creep')();
require("./prototype.room")();

module.exports.loop = function () {


    /*
    //Die Schritte der creeps tracken
    for (let name in Game.rooms){
        Game.rooms[name].trackUsage();
        Game.rooms[name].baueStrassen();
    }
     */

    //Tote Creeps loeschen
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    //Die Creeps ihr Ding machen lassen
    var creep = undefined;
    for (let name in Game.creeps) {
        creep = Game.creeps[name];
        creep.machDeinJob();
    }

    if (_.sum(Game.creeps, (c) => c.memory.role == 'Angreifer' && c.memory.hauptRaum == 'E9N22') < 0) {
        Game.spawns.Spawn1.spawnAngreifer("E9N23")
    } else {
        var anzahlSammler = _.sum(Game.creeps, (c) => c.memory.role == 'Sammler' && c.memory.hauptRaum == 'E9N22');
        //Wenn nicht genug Sammler -> Sammler herstellen
        if (anzahlSammler < 2) {
            if (anzahlSammler == 0) {
                //Wenn es gar keine Creeps mehr gibt
                if (_.sum(Game.creeps, (c) => c.memory.hauptRaum == 'E9N22') == 0) {
                    Game.spawns.Spawn1.creepErstellen([WORK, CARRY, MOVE], {"role": "Sammler", hauptRaum: 'E9N22'});
                } else {
                    var role = "";
                    if (_.sum(Game.creeps, (c) => c.memory.role == 'mauerReparierer' && c.memory.hauptRaum == 'E9N22') > 0) {
                        role = "mauerReparierer";
                    } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Bauerbeiter' && c.memory.hauptRaum == 'E9N22') > 0) {
                        role = "Bauerbeiter";
                    } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Upgrader' && c.memory.hauptRaum == 'E9N22') > 0) {
                        role = "Upgrader";
                    }
                    if (role != "") {
                        for (let i = 0; i < Object.keys(Game.creeps).length; i++) {
                            if (Game.creeps[Object.keys(Game.creeps)[i]].memory.role == role && Game.creeps[Object.keys(Game.creeps)[i]].memory.hauptRaum == 'E9N22') {
                                Game.creeps[Object.keys(Game.creeps)[i]].memory.role = "Sammler";
                                break;
                            }
                        }
                    } else {
                        for (let i = 0; i < Object.keys(Game.creeps).length; i++) {
                            if (Game.creeps[Object.keys(Game.creeps)[i]].memory.hauptRaum == 'E9N22') {
                                Game.creeps[Object.keys(Game.creeps)[i]].memory.role = "Sammler";
                                break;
                            }
                        }
                    }
                }
            } else {
                Game.spawns.Spawn1.spawnSammler();
            }
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzSammler' && c.memory.hauptRaum == 'E9N22' && c.memory.zielRaum == "E9N21") < 1) {
            Game.spawns.Spawn1.spawnDistanzSammler('E9N21');
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Upgrader' && c.memory.hauptRaum == 'E9N22') < 1) {
            Game.spawns.Spawn1.spawnUpgrader();
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzSammler' && c.memory.hauptRaum == 'E9N22' && c.memory.zielRaum == "E8N21") < 1) {
            Game.spawns.Spawn1.spawnDistanzSammler('E8N21','E9N21');
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzUpgrader' && c.memory.hauptRaum == 'E9N22' && c.memory.zielRaum == "E9N23") < 1) {
            Game.spawns.Spawn1.spawnDistanzUpgrader('E9N23');
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Bauerbeiter' && c.memory.hauptRaum == 'E9N22') < 1) {
            Game.spawns.Spawn1.spawnBauerbeiter();
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'mauerReparierer' && c.memory.hauptRaum == 'E9N22') < 1) {
            Game.spawns.Spawn1.spawnMauerReparierer();
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Upgrader' && c.memory.hauptRaum == 'E9N22') < 3) {
            Game.spawns.Spawn1.spawnUpgrader();
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzUpgrader' && c.memory.hauptRaum == 'E9N22' && c.memory.zielRaum == "E9N23") < 2) {
            Game.spawns.Spawn1.spawnDistanzUpgrader('E9N23');
        }
         else {
            Game.spawns.Spawn1.spawnBauerbeiter();
        }
    }

    if (_.sum(Game.creeps, (c) => c.memory.role == 'Angreifer' && c.memory.hauptRaum == 'E8N23') < 0) {
        Game.spawns.Spawn3.spawnAngreifer("E9N23")
    } else {
        if (_.sum(Game.creeps, (c) => c.memory.role == 'Sammler' && c.memory.hauptRaum == 'E8N23') < 1) {
            Game.spawns.Spawn3.spawnSammler();
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Upgrader' && c.memory.hauptRaum == 'E8N23') < 2) {
            Game.spawns.Spawn3.spawnUpgrader();
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzSammler' && c.memory.hauptRaum == 'E8N23' && c.memory.zielRaum == "E8N24") < 1) {
            Game.spawns.Spawn3.spawnDistanzSammler('E8N24');
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Bauerbeiter' && c.memory.hauptRaum == 'E8N23') < 2) {
            Game.spawns.Spawn3.spawnBauerbeiter();
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzSammler' && c.memory.hauptRaum == 'E8N23' && c.memory.zielRaum == "E7N23") < 0) {
            Game.spawns.Spawn3.spawnDistanzSammler('E7N23');
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzSammler' && c.memory.hauptRaum == 'E8N23' && c.memory.zielRaum == "E9N23") < 1) {
            Game.spawns.Spawn3.spawnDistanzSammler('E9N23');
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzUpgrader' && c.memory.hauptRaum == 'E8N23' && c.memory.zielRaum == "E9N23") < 1) {
            Game.spawns.Spawn3.spawnDistanzUpgrader('E9N23');
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzUpgrader' && c.memory.hauptRaum == 'E8N23' && c.memory.zielRaum == "E8N24") < 2) {
            Game.spawns.Spawn3.spawnDistanzUpgrader('E8N24');
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'mauerReparierer' && c.memory.hauptRaum == 'E8N23') < 1) {
            Game.spawns.Spawn3.spawnMauerReparierer();
        } else {
            Game.spawns.Spawn3.spawnBauerbeiter();
        }
    }

    /*
    if (_.sum(Game.creeps, (c) => c.memory.role == 'Sammler' && c.memory.hauptRaum == 'E7N23') < 4) {
        Game.spawns.Spawn2.spawnSammler();
    } //else if (_.sum(Game.creeps, (c) => c.memory.role == 'Mauerbrecher' && c.memory.hauptRaum == 'E7N23') < 0) {
        //Game.spawns.Spawn2.spawnMauerBrecher(13,2);
    //}
    else if (_.sum(Game.creeps, (c) => c.memory.role == 'Bauerbeiter' && c.memory.hauptRaum == 'E7N23') < 2) {
        Game.spawns.Spawn2.spawnBauerbeiter();
    } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Upgrader' && c.memory.hauptRaum == 'E7N23') < 1) {
        Game.spawns.Spawn2.spawnUpgrader();
    }else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzBauerbeiter' && c.memory.hauptRaum == 'E7N23' && c.memory.zielRaum == 'E6N23') < 2) {
        Game.spawns.Spawn2.spawnDistanzBauerbeiter("E6N23");
    } else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzBauerbeiter' && c.memory.hauptRaum == 'E7N23' && c.memory.zielRaum == 'E7N24') < 2) {
        Game.spawns.Spawn2.spawnDistanzBauerbeiter("E7N24");
    }

     else if (_.sum(Game.creeps, (c) => c.memory.role == 'Angreifer' && c.memory.hauptRaum == 'E7N23' && c.memory.zielRaum == 'E6N23') < 1) {
        Game.spawns.Spawn2.spawnAngreifer("E6N23");
    } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Angreifer' && c.memory.hauptRaum == 'E7N23' && c.memory.zielRaum == 'E6N22') < 1) {
        Game.spawns.Spawn2.spawnAngreifer("E6N22", "E6N23");
    }

    else {
        Game.spawns.Spawn2.spawnBauerbeiter();

        //Game.spawns.Spawn2.spawnAngreifer("E6N23");
    }
    */

    //Die Tower schiessen lassen im Ernstfall
    for (let name in Game.rooms) {
        Game.rooms[name].roleAusfuehren();
        var towers = Game.rooms[name].find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
        for (let tower of towers) {
            tower.run();
        }
    }

}