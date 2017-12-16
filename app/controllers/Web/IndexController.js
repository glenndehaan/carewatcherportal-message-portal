const database = require("../../helpers/modules/database").db;
const config = require("../../config/config");
const arrays = require("../../helpers/utils/Arrays");

class IndexController {
    indexAction(req, res) {
        res.render('index/index.ejs', {
            messages: arrays.addClientsToArray(database.getData("/message"), database.getData("/room")),
            config: config,
            hostname: req.hostname
        });
    }
}

module.exports = new IndexController();
