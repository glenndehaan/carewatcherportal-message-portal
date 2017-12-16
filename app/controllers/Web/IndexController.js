const database = require("../../helpers/modules/database").db;
const config = require("../../config/config");

class IndexController {
    indexAction(req, res) {
        res.render('index/index.ejs', {
            messages: database.getData("/message"),
            config: config,
            hostname: req.hostname
        });
    }
}

module.exports = new IndexController();
