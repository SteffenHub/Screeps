var roleSammler = require('role.Sammler');
var roleUpgrader = require('role.Upgrader');
var roleBauerbeiter = require('role.Bauerbeiter');
require('prototype.Spawn')();
const { filter } = require('lodash');



module.exports.loop = function () {

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
        }else if(creep.memory.role == 'Upgrader'){
            roleUpgrader.run(creep);
        }else if(creep.memory.role == 'Bauerbeiter'){
            roleBauerbeiter.run(creep);
        }
    }

    //Wenn nicht genug Sammler -> Sammler herstellen
    if (_.sum(Game.creeps, (c) => c.memory.role == 'Sammler') < 4){
        Game.spawns.Spawn1.spawnSammler();
    //Wenn nicht genug Upgrader -> Upgrader herstellen   
    }else if(_.sum(Game.creeps, (c) => c.memory.role == 'Upgrader') < 1){
        Game.spawns.Spawn1.spawnUpgrader();
    }else{
        var anzahlSammler = _.sum(Game.creeps, (c) => c.memory.role == 'Sammler');
        var anzahlUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'Upgrader');
        var anzahlBauerbeiter = _.sum(Game.creeps, (c) => c.memory.role == 'Bauerbeiter');
        var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity});
        //Wenn genug Creeps am Leben sind -> Tower voll machen
        if(anzahlSammler >= 4 && anzahlUpgrader >= 1 && anzahlBauerbeiter >= 2 && tower != undefined){
        
        //Default
        }else{    
        Game.spawns.Spawn1.spawnBauerbeiter();
        }
    }


    //Die Tower schiessen lassen im Ernstfall
    for(let name in Game.rooms){
        var towers = Game.rooms[name].find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
        for(let tower of towers){
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target != undefined){
                tower.attack(target);
            }
        }
    }

}