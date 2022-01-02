var roleSammler = require('role.Sammler');
var roleDistanzSammler = require('role.distanzSammler');
var roleUpgrader = require('role.Upgrader');
var roleBauerbeiter = require('role.Bauerbeiter');

require('prototype.Spawn')();
require('prototype.room.usageTracker')();
require('prototype.room.raumKonstrukteur')();
require('prototype.Tower')();

const { filter } = require('lodash');


module.exports.loop = function () {

    //Die Schritte der creeps tracken
    for (let name in Game.rooms){
        Game.rooms[name].trackUsage();
        Game.rooms[name].baueStrassen();
    }

    //Tote Creeps loeschen
    for(let name in Memory.creeps){
        if(Game.creeps[name] == undefined){
            delete Memory.creeps[name];
        }
    }
    
    //Die Creeps ihr Ding machen lassen
    var creep = undefined;
    for (let name in Game.creeps){
        creep = Game.creeps[name];

        if(creep.memory.role == 'Sammler'){
            roleSammler.run(creep);
        }else if (creep.memory.role == 'distanzSammler') {
            roleDistanzSammler.run(creep);
        }else if(creep.memory.role == 'Upgrader'){
            roleUpgrader.run(creep);
        }else if(creep.memory.role == 'Bauerbeiter'){
            roleBauerbeiter.run(creep);
        }
    }

    //Wenn nicht genug Sammler -> Sammler herstellen
    if (_.sum(Game.creeps, (c) => c.memory.role == 'Sammler') < 2) {
        Game.spawns.Spawn1.spawnSammler();
    }else if(_.sum(Game.creeps, (c) => c.memory.role == 'distanzSammler') < 2){
        Game.spawns.Spawn1.spawnDistanzSammler();
    //Wenn nicht genug Upgrader -> Upgrader herstellen   
    }else if(_.sum(Game.creeps, (c) => c.memory.role == 'Upgrader') < 1){
        Game.spawns.Spawn1.spawnUpgrader();
    //Default    
    }else{  
        Game.spawns.Spawn1.spawnBauerbeiter();
    }


    //Die Tower schiessen lassen im Ernstfall
    for(let name in Game.rooms){
        var towers = Game.rooms[name].find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
        for(let tower of towers){
            tower.run();
        }
    }
}