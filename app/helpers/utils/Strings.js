/**
 * Create's a random ID
 *
 * @return {string}
 */
function createId() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 60; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/**
 * Returns a color
 *
 * @param prio
 * @return {string}
 */
function getColorBasedOnPrio(prio) {
    switch (prio) {
        case 1:
            return "red";
        case 2:
            return "orange";
        case 3:
            return "green";
        default:
            return "blue";
    }
}

module.exports = {createId, getColorBasedOnPrio};
