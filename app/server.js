/**
 * Import base packages
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require("./helpers/utils/Database");

/**
 * Import own packages
 */
const config = require('./config/config');
const webRouter = require('./routers/Web');
const apiRouter = require('./routers/Api');

/**
 * Init the database
 */
database.init();

/**
 * Set template engine
 */
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

/**
 * Configure app to use bodyParser()
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Configure routers
 */
app.use('/', webRouter);
app.use('/api', apiRouter);

/**
 * Setup default 404 message
 */
app.use((req, res) => {
    res.status(404);

    // respond with json
    if (req.originalUrl.split('/')[1] === 'api') {
        res.send({ error: 'This API route is not implemented yet' });
        return;
    }

    res.send('Not found');
});

/**
 * Disable powered by header for security reasons
 */
app.disable('x-powered-by');

/**
 * Start listening on port
 */
app.listen(config.application.port, config.application.bind, () => {
    console.log(`[NODE] App is running on: ${config.application.bind}:${config.application.port}`);
});
