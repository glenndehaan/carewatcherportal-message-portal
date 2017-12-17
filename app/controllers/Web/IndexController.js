const database = require("../../helpers/modules/database").db;
const config = require("../../config/config");
const arrays = require("../../helpers/utils/Arrays");
const strings = require("../../helpers/utils/Strings");

class IndexController {
    /**
     * Renders the home page
     *
     * @param req
     * @param res
     */
    indexAction(req, res) {
        res.render('index/index.ejs', {
            messages: arrays.addClientsToArray(database.getData("/message"), database.getData("/room")),
            config: config,
            hostname: req.hostname,
            stringsHelper: strings
        });
    }
}

module.exports = new IndexController();
