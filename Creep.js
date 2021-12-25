/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Creep');
 * mod.thing == 'a thing'; // true
 */

const { functionsIn } = require("lodash");

module.exports = {

    arbeitEinteilen: function(creep){
        //Wenn Energie voll
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.arbeitet = true;
        }
        //Wenn Energie leer
        else if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == creep.store.getCapacity(RESOURCE_ENERGY)){
            creep.memory.arbeitet = false;
        }
    }

    ,energieHolen: function(creep){
        var energy = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(energy) == ERR_NOT_IN_RANGE){
            creep.moveTo(energy);
        }
    }

    ,energieAbgeben: function(creep,ziel){
        if(creep.transfer(ziel, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(ziel);
        }
    }

    ,freieEnergieExistiert: function(creep){
        var droppedSource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
        if (droppedSource == undefined){
            return false;
        }else{
            return true;
        }
    }

    /*
        NICHT FERTIG, CALCULATION IS BETTER THEN BRUTE
    */
    ,spawnNewCreeps: function(creep){
        var roomCapacity = creep.room.energyCapacityAvailable;
        //Wenn alle Sammler voll sind
        if (roomCapacity == creep.room.energyCapacity){
            var rolle = undefined;
            var konfiguration = undefined;
            if (_.sum(Game.creeps, (c) => c.memory.role == 'Sammler') <= 6){
                rolle = 'Sammler';
                if (roomCapacity == 300){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 350){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 400){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 450){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 500){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 550){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 600){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 650){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 700){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 750){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 800){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 850){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 900){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 950){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 1000){konfiguration = [WORK,WORK,CARRY,MOVE];}
                if (roomCapacity == 1050){konfiguration = [WORK,WORK,CARRY,MOVE];}
                else{konfiguration = [WORK,WORK,CARRY,MOVE];}

                

                Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role:'Sammler', arbeitet: false});
            }else if(_.sum(Game.creeps, (c) => c.memory.role == 'Upgrader') < 6){
                rolle = 'Upgrader';
                Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role:'Upgrader', arbeitet: false});
            }else{
                rolle = 'Bauerbeiter';
                Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role:'Bauerbeiter', arbeitet: false});
            }
            
            Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: rolle, arbeitet: false});
        }
    }

};