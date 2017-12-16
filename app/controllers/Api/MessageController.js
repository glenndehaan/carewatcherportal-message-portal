const baseController = require('./BaseController');
const database = require("../../helpers/modules/database").db;
const createId = require("../../helpers/utils/Strings").createId;
const config = require("../../config/config");
const objects = require("../../helpers/utils/Objects");

class MessageController extends baseController {
    constructor() {
        super();
    }

    indexAction(req, res) {
        console.log('[API] Returning all messages');

        this.jsonResponse(res, 200, { 'messages': database.getData("/message") });
    }

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
}

module.exports = new MessageController();
