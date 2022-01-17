const roleSammler = require("./role.Sammler");
const roleDistanzSammler = require("./role.distanzSammler");
const roleUpgrader = require("./role.Upgrader");
const roleBauerbeiter = require("./role.Bauerbeiter");
const roleMauerRepariere = require("./role.MauerReparierer");
const roleClaimer = require("./role.Claimer");
const roleAngreifer = require("./role.Angreifer");
const roleDistanzUpgrader = require("./role.distanzUpgrader");
const roleMauerBrecher = require("./role.mauerBrecher");
const roleDistanzBauerbeiter = require("./role.distanzBauerbeiter");
const roleMiner = require("./role.Miner");


module.exports = function() {

    /**
     * Ruft den jeweiligen Code auf, dem der Role zugeschrieben ist
     */
    Creep.prototype.machDeinJob = function(){
        if (this.memory.role == 'Sammler') {
            roleSammler.run(this);
        } else if (this.memory.role == 'distanzSammler') {
            roleDistanzSammler.run(this);
        } else if (this.memory.role == 'Upgrader') {
            roleUpgrader.run(this);
        } else if (this.memory.role == 'Bauerbeiter') {
            roleBauerbeiter.run(this);
        } else if (this.memory.role == 'mauerReparierer') {
            roleMauerRepariere.run(this);
        } else if (this.memory.role == 'Claimer') {
            roleClaimer.run(this);
        } else if (this.memory.role == 'Angreifer') {
            roleAngreifer.run(this);
        } else if (this.memory.role == 'distanzUpgrader') {
            roleDistanzUpgrader.run(this);
        } else if (this.memory.role == 'Mauerbrecher') {
            roleMauerBrecher.run(this);
        } else if (this.memory.role == 'distanzBauerbeiter') {
            roleDistanzBauerbeiter.run(this);
        } else if (this.memory.role == 'Miner') {
            roleMiner.run(this);
        }
    };

    /**
     * Organisiert Energie.
     * Dabei gehen wir einer Heraichie nach
     */
    Creep.prototype.holeEnergie = function(){
        //Erstmal nach richtigen Energie sourcen suchen
        //if (this.containerEnergieHolen()){

        //}else
        if(this.energieSourceAbbauen()){
        //Dann nach dropped sources suchen 
        }else if (this.droppedEnergieHolen()){
        //Dann nach grabsteinen suchen    
        }else if (this.energieAusGrabsteinHolen()){
         //Dann nach ruinen suchen    
        }else if (this.energieAusRuineHolen()){
            
        }
    };

    /**
     * Teilt ein, ob ein Creep arbeitet oder nicht.
     * Wenn creep nicht arbeitet -> er holt Energie
     * 
     * @returns Boolean ob der Creep gerade arbeitet oder nicht
     */
    Creep.prototype.arbeitet = function(){
        //Wenn Energie voll
        if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            this.memory.arbeitet = true;
        }
        //Wenn Energie leer
        else if (this.store.getFreeCapacity(RESOURCE_ENERGY) == this.store.getCapacity(RESOURCE_ENERGY)){
            this.memory.arbeitet = false;
        }
        return this.memory.arbeitet;
    };

    /**
     * Transferiert Energie zu dem gegebenen Ziel
     * 
     * @param {*} ziel Ein Objekt, dass Energie empfangen kann
     */
    Creep.prototype.energieAbgeben = function(ziel){
        if(this.transfer(ziel, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            this.moveTo(ziel);
        }
    };




    /**                         **\
     *                           *   
     *                           * 
     *      PRIVATE METHODEN     *
     *                           *  
     *                           *  
    \*                           */





    Creep.prototype.containerEnergieHolen = function (){
        var container = this.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});
        if (container != undefined){
            if (container.store.getCapacity() < container.store[RESOURCE_ENERGY]){
                var containerTmp = this.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= this.store.getFreeCapacity()});
                if (containerTmp != undefined){
                    container = containerTmp;
                }
            }
            if(this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(container);
            }
            return true
        }
        return false;
    }

    /**
     * Sucht nach dem naechsten Energie Source und baut es ab bzw. geht erst dort hin
     * 
     * @returns true wenn eins gefunden, wo man hin gehen kann
     */
    Creep.prototype.energieSourceAbbauen = function(){
        //var energy = this.sucheNaechsteEnergieSourceMitEnergie();
        var energy = this.pos.findClosestByPath(FIND_SOURCES, {filter: (s) => s.energy != null});
        if(energy != undefined){
            if (energy.memory != undefined && energy.memory.Container != undefined && Game.getObjectById(energy.memory.Container.id) != undefined && Game.getObjectById(energy.memory.Container.id).progress == null && Game.getObjectById(energy.memory.Container.id).store[RESOURCE_ENERGY] >= this.store.getFreeCapacity()){
                if(this.withdraw(Game.getObjectById(energy.memory.Container.id), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(Game.getObjectById(energy.memory.Container.id));
                }
                return true;
            }else{
                for (let i = 0; i < this.body.length; i++) {
                    if (this.body[i].type == "work"){
                        energy = this.sucheNaechsteEnergieSourceMitEnergie();
                        if (energy != undefined) {
                            if (this.harvest(energy) == ERR_NOT_IN_RANGE) {
                                this.moveTo(energy);
                            }
                            return true;
                        }
                    }
                }
                return this.containerEnergieHolen();
            }
        }
        return false;
    };

    /**
     * Sucht nach der naechsten fallen gelassenen Energie und holt es ab bzw. geht erst dort hin
     * 
     * @returns true wenn eins gefunden, wo man hin gehen kann
     */
    Creep.prototype.droppedEnergieHolen = function(){
        var droppedEnergy = this.sucheNaechstefallenGelasseneResourceMitEnergie();
        if (droppedEnergy != undefined){
            if(this.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                this.moveTo(droppedEnergy);
            }
            return true;
        }
        return false;
    };
    
    /**
     *  Sucht nach der naechsten Grabstein mit Energie und holt es ab bzw. geht erst dort hin
     * 
     * @returns true wenn eins gefunden, wo man hin gehen kann
     */
    Creep.prototype.energieAusGrabsteinHolen = function(){
        var tombstone = this.sucheNaechsteGrabsteinMitEnergie();
        if (tombstone != undefined){
            //Wenn es eine Liste ist(mehr als ein Grabstein)
            if (tombstone[0] != undefined){
                tombstone = tombstone[0];
            }
            if(this.withdraw(tombstone,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(tombstone);
            }
            return true;
        }
        return false;
    };

    /**
     *  Sucht nach der naechsten Ruine mit Energie und holt es ab bzw. geht erst dort hin
     * 
     * @returns true wenn eins gefunden, wo man hin gehen kann
     */
    Creep.prototype.energieAusRuineHolen = function(){
        var ruine = this.sucheNaechsteRuineMitEnergie();
        if (ruine != undefined){
            if(this.withdraw(ruine,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(ruine);
            }
            return true;
        }
        return false;
    };
};