const database = require("../../helpers/modules/Database").db;
const config = require("../../config/config");
const arrays = require("../../helpers/utils/Arrays");

class AdminController {
    /**
     * Renders the room overview page
     *
     * @param req
     * @param res
     */
    roomAction(req, res) {
        res.render('admin/room.ejs', {
            rooms: database.getData("/room"),
            config: config,
            hostname: req.hostname
        });
    }

    /**
     * Renders the create room form
     *
     * @param req
     * @param res
     */
    createRoomAction(req, res) {
        res.render('admin/room_form.ejs', {
            title: 'Assign a room',
            room: {id: '', client_name: ''},
            action: 'create',
            config: config,
            hostname: req.hostname
        });
    }

    /**
     * Renders the edit room form
     *
     * @param req
     * @param res
     */
    editRoomAction(req, res) {
        const index = arrays.findIndexByKeyValue(database.getData("/room"), "id", req.params.id);

        if (index !== false) {
            const roomData = database.getData(`/room[${index}]`);

            res.render('admin/room_form.ejs', {
                title: 'Edit room',
                room: {id: roomData.id, client_name: roomData.client_name},
                action: 'edit',
                config: config,
                hostname: req.hostname
            });
        } else {
            res.redirect('/admin/room');
        }
    }

    /**
     * Deletes a room from the DB
     *
     * @param req
     * @param res
     */
    deleteRoomAction(req, res) {
        const index = arrays.findIndexByKeyValue(database.getData("/room"), "id", req.params.id);

        if (index !== false) {
            database.delete(`/room[${index}]`);
        }

        res.redirect('/admin/room');
    }
}

module.exports = new AdminController();
