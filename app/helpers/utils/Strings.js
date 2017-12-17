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
            return "blue";
        case 2:
            return "orange";
        case 3:
            return "red";
        default:
            return "blue";
    }
}

/**
 * Returns a icon name based on prio
 *
 * @param prio
 * @return {string}
 */
function getIconOnPrio(prio) {
    switch (prio) {
        case 1:
            return "speaker_notes";
        case 2:
            return "warning";
        case 3:
            return "error_outline";
        default:
            return "speaker_notes";
    }
}

/**
 * Prepend the 0 if we need it
 *
 * @param time
 * @return {*}
 */
function fixTimeCalculation(time) {
    if(time < 10){
        return `0${time}`;
    } else {
        return time
    }
}

module.exports = {createId, getColorBasedOnPrio, getIconOnPrio, fixTimeCalculation};
