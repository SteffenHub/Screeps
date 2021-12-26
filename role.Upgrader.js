

module.exports = {
    run: function(creep){

        if (creep.arbeitet()){
             creep.energieAbgeben(creep.room.controller);
        }else{
             creep.holeEnergie();
        }
     }
};