const database = require("../../helpers/utils/database").db;

class IndexController {
    indexAction(req, res) {
        res.render('index/index.ejs', {
            robots: database.getData("/robot")
        });
    }
}

module.exports = new IndexController();
