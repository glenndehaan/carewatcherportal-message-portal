const arrays = require("./Arrays");

/**
 * Add clients to object
 *
 * @param room
 * @param clients
 * @return {*}
 */
function addClientsToObject(room, clients) {
    const roomNumber = room.roomNumber;
    const clientIndex = arrays.findIndexByKeyValue(clients, "id", roomNumber);

    if(clientIndex !== false) {
        room.client_name = clients[clientIndex].client_name;
    } else {
        room.client_name = "Room not in use!";
    }

    return room;
}

module.exports = {addClientsToObject};
