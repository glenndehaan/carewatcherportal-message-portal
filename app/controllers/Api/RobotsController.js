const baseController = require('./BaseController');
const database = require("../../helpers/utils/database").db;

class IndexController extends baseController {
    constructor() {
        super();
    }

    indexAction(req, res) {
        this.jsonResponse(res, 200, { 'robots': database.getData("/robot") });
    }

    createAction(req, res) {
        database.push("/robot[]", {
            name: req.body.name
        });

        this.jsonResponse(res, 201, { 'message': 'Robot created!' });
    }

    // getOneAction(req, res) {
    //     Robot.findOne({name: req.params.id}, (err, robot) => {
    //         if (err)
    //             this.jsonResponse(res, 400, { 'error': err });
    //
    //         this.jsonResponse(res, 200, { 'robot': robot });
    //     });
    // }

    // deleteAction(req, res) {
    //     Robot.remove({ _id: req.params.id }, (err, robot) => {
    //         if (err)
    //             this.jsonResponse(res, 400, { 'error': err });
    //
    //         this.jsonResponse(res, 204, { 'message': 'Deleted successfully!' });
    //     });
    // }
}

module.exports = new IndexController();
