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

module.exports = {findIndexByKeyValue};
