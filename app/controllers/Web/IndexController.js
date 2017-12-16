const database = require("../../helpers/modules/database").db;

class IndexController {
    indexAction(req, res) {
        res.render('index/index.ejs', {
            messages: database.getData("/message")
        });
    }
}

module.exports = new IndexController();
