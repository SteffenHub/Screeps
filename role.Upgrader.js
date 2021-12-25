var Creep = require('Creep');

module.exports = {
    run: function(creep){

        Creep.arbeitEinteilen(creep);

        if (creep.memory.arbeitet){
             Creep.energieAbgeben(creep,creep.room.controller);
        }else{
             Creep.energieHolen(creep);
        }
     }
};