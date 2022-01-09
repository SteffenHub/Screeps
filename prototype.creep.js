const roleSammler = require("./role.Sammler");
const roleDistanzSammler = require("./role.distanzSammler");
const roleUpgrader = require("./role.Upgrader");
const roleBauerbeiter = require("./role.Bauerbeiter");
const roleMauerRepariere = require("./role.MauerReparierer");
const roleClaimer = require("./role.Claimer");
const roleAngreifer = require("./role.Angreifer");
const roleDistanzUpgrader = require("./role.distanzUpgrader");

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
        }
    };

    /**
     * Organisiert Energie.
     * Dabei gehen wir einer Heraichie nach
     */
    Creep.prototype.holeEnergie = function(){
        //Erstmal nach richtigen Energie sourcen suchen
        if(!this.energieSourceAbbauen()){
        //Dann nach dropped sources suchen 
        }else if (!this.droppedEnergieHolen()){
        //Dann nach grabsteinen suchen    
        }else if (!this.energieAusGrabsteinHolen()){       
         //Dann nach ruinen suchen    
        }else if (!this.energieAusRuineHolen()){
            
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





    /**
     * Sucht nach dem naechsten Energie Source und baut es ab bzw. geht erst dort hin
     * 
     * @returns true wenn eins gefunden, wo man hin gehen kann
     */
    Creep.prototype.energieSourceAbbauen = function(){
        var energy = this.pos.findClosestByPath(FIND_SOURCES, {filter: (s) => s.energy > 0});
        if(energy != undefined){
            if (this.harvest(energy) == ERR_NOT_IN_RANGE){
                this.moveTo(energy);
            }
            return true;
        }
        return false;
    };

    /**
     * Sucht nach der naechsten fallen gelassenen Energie und holt es ab bzw. geht erst dort hin
     * 
     * @returns true wenn eins gefunden, wo man hin gehen kann
     */
    Creep.prototype.droppedEnergieHolen = function(){
        var droppedEnergy = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: (s) => s.energy > 0});
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
        var tombstone = this.pos.findClosestByPath(FIND_TOMBSTONES, {filter: (t) => t.store.energy > 0});
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
        var ruine = this.pos.findClosestByPath(FIND_RUINS, {filter: (r) => r.store.energy > 0});
        if (ruine != undefined){
            //Wenn es eine Liste ist(mehr als eine ruine)
            if (ruine[0] != undefined){
                ruine = ruine[0];
            }
            if(this.withdraw(ruine,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(ruine);
            }
            return true;
        }
        return false;
    };
};