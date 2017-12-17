const baseController = require('./BaseController');
const database = require("../../helpers/modules/database").db;
const createId = require("../../helpers/utils/Strings").createId;
const config = require("../../config/config");
const objects = require("../../helpers/utils/Objects");

class MessageController extends baseController {
    constructor() {
        super();
    }

    /**
     * Returns all messages in the DB
     *
     * @api {get} /api/message /api/message
     * @apiName getMessage
     * @apiGroup Message
     *
     * @apiSuccess {Object[]} messages An array containing all messages in the DB (Array of Objects)
     * @apiSuccess {String} messages._id The DB generated ID
     * @apiSuccess {Int} messages.id The message ID
     * @apiSuccess {Int} messages.roomNumber The room number
     * @apiSuccess {String} messages.title The title of the message
     * @apiSuccess {String} messages.message The message
     * @apiSuccess {Int} messages.prio The prio number
     * @apiSuccess {Int} messages.created When is the message created in Unix Epoch style
     * @apiSuccess {Bool} messages.completed Is the message completed?
     * @apiSuccess {String} messages.client_name The client name
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "messages": []
     *     }
     *
     * @param req
     * @param res
     */
    indexAction(req, res) {
        console.log('[API] Returning all messages');

        this.jsonResponse(res, 200, {'messages': database.getData("/message")});
    }

    /**
     * Creates a new message in the DB and notify's all sockets (JSON call)
     *
     * @api {post} /api/message /api/message
     * @apiName addMessageJSON
     * @apiGroup Message
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "id": 1,
     *       "roomNumber": 1,
     *       "title": "A test message",
     *       "message": "Put some message text in here",
     *       "prio": 1
     *     }
     *
     * @apiSuccess {String} message Message created!
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Message created!"
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
    createAction(req, res) {
        const id = req.body.id;
        const roomNumber = req.body.roomNumber;
        const title = req.body.title;
        const message = req.body.message;
        const prio = req.body.prio;

        if (typeof id !== "undefined" && typeof roomNumber !== "undefined" && typeof title !== "undefined" && typeof message !== "undefined" && typeof prio !== "undefined") {
            const currentDate = new Date();
            const id = createId();
            const created = currentDate.getTime();

            database.push("/message[]", {
                _id: id,
                id: req.body.id,
                roomNumber: req.body.roomNumber,
                title: req.body.title,
                message: req.body.message,
                prio: req.body.prio,
                created: created,
                completed: false
            });

            const socketMessage = objects.addClientsToObject({
                _id: id,
                id: req.body.id,
                roomNumber: req.body.roomNumber,
                title: req.body.title,
                message: req.body.message,
                prio: req.body.prio,
                created: created,
                completed: false
            }, database.getData("/room"));

            config.socket.broadcastNewMessage(socketMessage);

            console.log(`[API] New message created with ID: ${req.body.id}`);
            this.jsonResponse(res, 201, {'message': 'Message created!'});
        } else {
            this.jsonResponse(res, 400, {'error': 'Incorrect body!'});
        }
    }

    /**
     * Creates a new message in the DB and notify's all sockets (Form Data call)
     *
     * @api {post} /api/message/alt /api/message/alt
     * @apiName addMessageFormData
     * @apiGroup Message
     *
     * @apiParam {Int} [id]
     * @apiParam {Int} roomnr
     * @apiParam {String} title
     * @apiParam {String} description
     * @apiParam {Int} priority
     *
     * @apiSuccess {String} message Message created!
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Message created!"
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
    createAltAction(req, res) {
        const roomNumber = req.body.roomnr;
        const title = req.body.title;
        const message = req.body.description;
        const prio = req.body.priority;

        if (typeof roomNumber !== "undefined" && typeof title !== "undefined" && typeof message !== "undefined" && typeof prio !== "undefined") {
            const currentDate = new Date();
            const _id = createId();
            const created = currentDate.getTime();
            let id = req.body.id;

            if (typeof id === "undefined") {
                id = false;
            }

            database.push("/message[]", {
                _id: _id,
                id: id,
                roomNumber: parseInt(req.body.roomnr),
                title: req.body.title,
                message: req.body.description,
                prio: parseInt(req.body.priority),
                created: created,
                completed: false
            });

            const socketMessage = objects.addClientsToObject({
                _id: _id,
                id: id,
                roomNumber: parseInt(req.body.roomnr),
                title: req.body.title,
                message: req.body.description,
                prio: parseInt(req.body.priority),
                created: created,
                completed: false
            }, database.getData("/room"));

            config.socket.broadcastNewMessage(socketMessage);

            console.log(`[API] New message created with ID: ${id}`);
            this.jsonResponse(res, 201, {'message': 'Message created!'});
        } else {
            this.jsonResponse(res, 400, {'error': 'Incorrect body!'});
        }
    }
}

module.exports = new MessageController();
