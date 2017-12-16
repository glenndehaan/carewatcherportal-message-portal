/**
 * Returns the index in an array of objects
 *
 * @param array
 * @param key
 * @param value
 * @return {*}
 */
function findIndexByKeyValue(array, key, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][key] == value) {
            return i;
        }
    }

    return false;
}

/**
 * Add clients to array
 *
 * @param rooms
 * @param clients
 * @return {*}
 */
function addClientsToArray(rooms, clients) {
    for (let i = 0; i < rooms.length; i++) {
        const roomNumber = rooms[i].roomNumber;
        const clientIndex = findIndexByKeyValue(clients, "id", roomNumber);

        if(clientIndex !== false) {
            rooms[i].client_name = clients[clientIndex].client_name;
        } else {
            rooms[i].client_name = "Room not in use!";
        }
    }

    return rooms.sort(sortOnCreated);
}

/**
 * Sort on created
 *
 * @param a
 * @param b
 * @return {number}
 */
function sortOnCreated(a, b) {
    if (a.created < b.created)
        return 1;
    if (a.created > b.created)
        return -1;
    return 0;
}

module.exports = {findIndexByKeyValue, addClientsToArray, sortOnCreated};
