const baseController = require('./BaseController');
const database = require("../../helpers/modules/Database").db;
const config = require("../../config/config");
const arrays = require("../../helpers/utils/Arrays");

class AdminController extends baseController {
    constructor() {
        super();
    }

    /**
     * Updated a message in the DB and sends an update to the sockets
     *
     * @api {post} /api/admin/message /api/admin/message
     * @apiName message
     * @apiGroup Admin
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "_id": 1
     *     }
     *
     * @apiSuccess {String} message Message modified!
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Message modified!"
     *     }
     *
     * @apiError {String} error Incorrect message!
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "error": "Incorrect message!"
     *     }
     *
     * @param req
     * @param res
     */
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

    /**
     * Creates or updates a room in the Database
     *
     * @api {post} /api/admin/room /api/admin/room
     * @apiName room
     * @apiGroup Admin
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "id": 1,
     *       "action": "create",
     *       "client_name": "Test User"
     *     }
     *
     * @apiSuccess {String} message Room created!
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Room created!"
     *     }
     *
     * @apiError {String} error Incorrect body!
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "error": "Incorrect body!"
     *     }
     *
     * @param req
     * @param res
     */
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
