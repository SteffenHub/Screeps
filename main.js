var roleSammler = require('role.Sammler');
var roleDistanzSammler = require('role.distanzSammler');
var roleUpgrader = require('role.Upgrader');
var roleBauerbeiter = require('role.Bauerbeiter');
var roleMauerRepariere = require('role.MauerReparierer');
var roleClaimer = require('role.Claimer');
var roleAngreifer = require('role.Angreifer');
var roleDistanzUpgrader = require('role.distanzUpgrader');

require('prototype.Spawn')();
require('prototype.room.usageTracker')();
require('prototype.room.raumKonstrukteur')();
require('prototype.Tower')();

module.exports.loop = function () {

    //if (Game.rooms.E9N23.controller.upgradeBlocked == 30){
    //    console.log("ANGRIEFEN")
    //}

    Memory.ticksClaim = Memory.ticksClaim + 1;
    Memory.neueClaimer = false;
    if (Memory.ticksClaim%1000 == 0){
        Memory.neueClaimer = true;
    }
    if (Memory.neueClaimer){
        if (Game.spawns.Spawn1.createCreep([CLAIM,CLAIM,CLAIM,MOVE],undefined,{role: 'Claimer', zielRaum: 'E9N23'}) >= 0) {
            Memory.neueClaimer = false;
        }
    }

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

        if (creep.memory.role == 'Sammler') {
            roleSammler.run(creep);
        } else if (creep.memory.role == 'distanzSammler') {
            roleDistanzSammler.run(creep);
        } else if (creep.memory.role == 'Upgrader') {
            roleUpgrader.run(creep);
        } else if (creep.memory.role == 'Bauerbeiter') {
            roleBauerbeiter.run(creep);
        } else if (creep.memory.role == 'mauerReparierer') {
            roleMauerRepariere.run(creep);
        } else if (creep.memory.role == 'Claimer') {
            roleClaimer.run(creep);
        } else if (creep.memory.role == 'Angreifer') {
            roleAngreifer.run(creep);
        } else if (creep.memory.role == 'distanzUpgrader') {
            roleDistanzUpgrader.run(creep);
        }
    }

    if (_.sum(Game.creeps, (c) => c.memory.role == 'Angreifer' && c.memory.hauptRaum == 'E9N22') < 0) {
        Game.spawns.Spawn1.spawnAngreifer("E9N23")
    } else {
        var anzahlSammler = _.sum(Game.creeps, (c) => c.memory.role == 'Sammler' && c.memory.hauptRaum == 'E9N22');
        //Wenn nicht genug Sammler -> Sammler herstellen
        if (anzahlSammler < 2) {
            if (anzahlSammler == 0) {
                //Wenn es gar keine Creeps mehr gibt
                if (_.isEmpty(Game.creeps)) {
                    Game.spawns.Spawn1.creepErstellen([WORK, CARRY, MOVE], {"role": "Sammler"});
                } else {
                    var role = "";
                    if (_.sum(Game.creeps, (c) => c.memory.role == 'mauerReparierer') > 0) {
                        role = "mauerReparierer";
                    } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Bauerbeiter') > 0) {
                        role = "Bauerbeiter";
                    } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Upgrader') > 0) {
                        role = "Upgrader";
                    }
                    if (role != "") {
                        for (let i = 0; i < Object.keys(Game.creeps).length; i++) {
                            if (Game.creeps[Object.keys(Game.creeps)[i]].memory.role == role) {
                                Game.creeps[Object.keys(Game.creeps)[i]].memory.role = "Sammler";
                                break;
                            }
                        }
                    } else {
                        var randNummer = Math.floor(Math.random() * Object.keys(Game.creeps).length);
                        Game.creeps[Object.keys(Game.creeps)[randNummer]].memory.role = "Sammler";
                    }
                }
            } else {
                Game.spawns.Spawn1.spawnSammler();
            }
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzSammler' && c.memory.hauptRaum == 'E9N22' && c.memory.zielRaum == "E9N21") < 1) {
            Game.spawns.Spawn1.spawnDistanzSammler('E9N21');
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Upgrader' && c.memory.hauptRaum == 'E9N22') < 1) {
            Game.spawns.Spawn1.spawnUpgrader();
        } //else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzUpgrader' && c.memory.hauptRaum == 'E9N22' && c.memory.zielRaum == "E9N23") < 1) {
            //Game.spawns.Spawn1.spawnDistanzUpgrader('E9N23');
        //}
          else if (_.sum(Game.creeps, (c) => c.memory.role == 'Bauerbeiter' && c.memory.hauptRaum == 'E9N22') < 1) {
            Game.spawns.Spawn1.spawnBauerbeiter();
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'mauerReparierer' && c.memory.hauptRaum == 'E9N22') < 1) {
            Game.spawns.Spawn1.spawnMauerReparierer();
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'Upgrader' && c.memory.hauptRaum == 'E9N22') < 2) {
            Game.spawns.Spawn1.spawnUpgrader();
        } //else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzUpgrader' && c.memory.hauptRaum == 'E9N22' && c.memory.zielRaum == "E9N23") < 2) {
            //Game.spawns.Spawn1.spawnDistanzUpgrader('E9N23');
        //}
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
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzSammler' && c.memory.hauptRaum == 'E8N23' && c.memory.zielRaum == "E7N23") < 2) {
            Game.spawns.Spawn3.spawnDistanzSammler('E7N23');
        } //else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzSammler' && c.memory.hauptRaum == 'E8N23' && c.memory.zielRaum == "E9N23") < 2) {
            //Game.spawns.Spawn3.spawnDistanzSammler('E9N23');
        //}
         else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzUpgrader' && c.memory.hauptRaum == 'E8N23' && c.memory.zielRaum == "E8N24") < 2) {
            Game.spawns.Spawn3.spawnDistanzUpgrader('E8N24');
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'mauerReparierer' && c.memory.hauptRaum == 'E8N23') < 1) {
            Game.spawns.Spawn3.spawnMauerReparierer();
        } else if (_.sum(Game.creeps, (c) => c.memory.role == 'distanzSammler' && c.memory.hauptRaum == 'E8N23' && c.memory.zielRaum == "E7N23") < 4) {
            Game.spawns.Spawn3.spawnDistanzSammler('E7N23');
        } else {
            Game.spawns.Spawn3.spawnBauerbeiter();
        }
    }


    //Die Tower schiessen lassen im Ernstfall
    for (let name in Game.rooms) {
        var towers = Game.rooms[name].find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
        for (let tower of towers) {
            tower.run();
        }
    }
}