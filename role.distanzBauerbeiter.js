const roleBauerbeiter = require("./role.Bauerbeiter");

module.exports = {
    run: function (creep) {
        if (!creep.geheZumZielRaum()) {
            roleBauerbeiter.run(creep);
        }
    }
};