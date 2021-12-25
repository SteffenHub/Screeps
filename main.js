var roleSammler = require('role.Sammler');
var roleUpgrader = require('role.Upgrader');
var roleBauerbeiter = require('role.Bauerbeiter');



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

    if (_.sum(Game.creeps, (c) => c.memory.role == 'Sammler') < 4){
        Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role:'Sammler', arbeitet: false});
    }else if(_.sum(Game.creeps, (c) => c.memory.role == 'Upgrader') < 1){
        Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role:'Upgrader', arbeitet: false});
    }else{
        var anzahlSammler = _.sum(Game.creeps, (c) => c.memory.role == 'Sammler');
        var anzahlUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'Upgrader');
        var anzahlBauerbeiter = _.sum(Game.creeps, (c) => c.memory.role == 'Bauerbeiter');
        var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity});
        //Wenn genug Creeps am Leben sind -> Tower voll machen
        if(anzahlSammler >= 4 && anzahlUpgrader >= 1 && anzahlBauerbeiter >= 2 && tower != undefined){
        
        }else{    
        Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role:'Bauerbeiter', arbeitet: false});
        }
    }
}