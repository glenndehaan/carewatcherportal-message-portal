const baseController = require('./BaseController');
const database = require("../../helpers/modules/database").db;
const config = require("../../config/config");
const arrays = require("../../helpers/utils/Arrays");

class AdminController extends baseController {
    constructor() {
        super();
    }

    messageAction(req, res) {
        const index = arrays.findIndexByKeyValue(database.getData("/message"), "_id", req.body._id);

        if (index !== false) {
            database.push(`/message[${index}]/completed`, true, true);

            config.socket.broadcastMessageComplete(req.body._id);

            this.jsonResponse(res, 201, {'message': 'Message modified!'});
        } else {
            this.jsonResponse(res, 400, {'error': 'Incorrect message!'});
        }
    }

    roomAction(req, res) {
        const action = req.body.action;

        switch (action) {
            case 'create':
                database.push("/room[]", {
                    id: req.body.id,
                    client_name: req.body.client_name
                });

                this.jsonResponse(res, 201, {'message': 'Room created!'});
                break;
            case 'edit':
                const index = arrays.findIndexByKeyValue(database.getData("/room"), "id", req.body.id);

                if (index !== false) {
                    database.push(`/room[${index}]/id`, req.body.id, true);
                    database.push(`/room[${index}]/client_name`, req.body.client_name, true);

                    this.jsonResponse(res, 201, {'message': 'Room modified!'});
                } else {
                    this.jsonResponse(res, 400, {'error': 'Incorrect room!'});
                }
                break;
            default:
                this.jsonResponse(res, 400, {'error': 'Incorrect body!'});
                break;
        }
    }
}

module.exports = new AdminController();
