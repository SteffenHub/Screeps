require('prototype.creep.bewegung')();
module.exports = {

    run: function(creep){

        //Erstmal in den Raum gehen, der angeriffen werden soll
        if (!creep.geheInRaum(creep.memory.zielRaum)){
            //Feindliche creeps angreifen
            var creeps = creep.sucheNaechstenGegner();
            if (creeps != undefined) {
                if (creep.attack(creeps) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creeps);
                }
            } else {
                //Spawn angreifen
                var spawn = creep.sucheNaechstenSpawn();
                if (spawn != undefined) {
                    if (creep.attack(spawn) == ERR_NOT_IN_RANGE){
                        creep.moveTo(spawn);
                    }
                } else {
                    //alles andere ausser controller angreifen
                    var gebauede = creep.sucheNaechsteStrukturOhneMauernUndController()
                    if (gebauede != undefined) {
                        if (creep.attack(gebauede) == ERR_NOT_IN_RANGE){
                            creep.moveTo(gebauede);
                        }
                    }
                }
            }
        }
    }
};