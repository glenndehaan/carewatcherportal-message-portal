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
     * @param req
     * @param res
     */
    indexAction(req, res) {
        console.log('[API] Returning all messages');

        this.jsonResponse(res, 200, { 'messages': database.getData("/message") });
    }

    /**
     * Creates a new message in the DB and notify's all sockets (JSON call)
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

        if(typeof id !== "undefined" && typeof roomNumber !== "undefined" && typeof title !== "undefined" && typeof message !== "undefined" && typeof prio !== "undefined"){
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
            this.jsonResponse(res, 201, { 'message': 'Message created!' });
        } else {
            this.jsonResponse(res, 400, { 'error': 'Incorrect body!' });
        }
    }

    /**
     * Creates a new message in the DB and notify's all sockets (Form Data call)
     *
     * @param req
     * @param res
     */
    createAltAction(req, res) {
        const roomNumber = req.body.roomnr;
        const title = req.body.title;
        const message = req.body.description;
        const prio = req.body.priority;

        if(typeof roomNumber !== "undefined" && typeof title !== "undefined" && typeof message !== "undefined" && typeof prio !== "undefined"){
            const currentDate = new Date();
            const _id = createId();
            const created = currentDate.getTime();
            let id = req.body.id;

            if(typeof id === "undefined") {
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
            this.jsonResponse(res, 201, { 'message': 'Message created!' });
        } else {
            this.jsonResponse(res, 400, { 'error': 'Incorrect body!' });
        }
    }
}

module.exports = new MessageController();
