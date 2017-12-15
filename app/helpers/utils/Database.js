/**
 * Import base packages
 */
const JsonDB = require('node-json-db');
const db = new JsonDB(`${__dirname}/../../config/database`, true, false);

/**
 * Initial function
 */
function init() {
    /**
     * Init the DB object if we launch the app for the first time
     */
    if (Object.keys(db.getData("/")).length === 0 && db.getData("/").constructor === Object) {
        db.push("/message", []);
        db.push("/robot", []);

        console.log("[DATABASE] Initialize database for the first time!");
    }

    console.log("[DATABASE] Ready!");
}

module.exports = {init, db};
