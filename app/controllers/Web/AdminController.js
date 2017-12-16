const database = require("../../helpers/modules/database").db;
const config = require("../../config/config");
const arrays = require("../../helpers/utils/Arrays");

class AdminController {
    roomAction(req, res) {
        res.render('admin/room.ejs', {
            rooms: database.getData("/room"),
            config: config,
            hostname: req.hostname
        });
    }

    createRoomAction(req, res) {
        res.render('admin/room_form.ejs', {
            title: 'Create new room',
            room: {id: '', client_name: ''},
            action: 'create',
            config: config,
            hostname: req.hostname
        });
    }

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

    deleteRoomAction(req, res) {
        const index = arrays.findIndexByKeyValue(database.getData("/room"), "id", req.params.id);

        if (index !== false) {
            database.delete(`/room[${index}]`);
        }

        res.redirect('/admin/room');
    }
}

module.exports = new AdminController();
