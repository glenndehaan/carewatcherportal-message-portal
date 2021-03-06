/**
 * Import base packages
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/**
 * Import own packages
 */
const config = require('./config/config');
const database = require('./helpers/modules/Database');
const socket = require('./helpers/modules/Socket');
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
 * Serve static public dir
 */
app.use(express.static(`${__dirname}/../public`));

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

        /**
         * API 404 not found
         *
         * @api {get} /api/notfound /api/notfound
         * @apiName notfound
         * @apiGroup General
         *
         * @apiError {String} error A default api not found message
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 404 Not Found
         *     {
         *       "error": "This API route is not implemented yet"
         *     }
         */
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
const server = app.listen(config.application.port, config.application.bind, () => {
    console.log(`[NODE] App is running on: ${config.application.bind}:${config.application.port}`);
});

/**
 * Init socket connection
 */
config.socket = new socket(server);

/**
 * Handle nodemon shutdown
 */
process.once('SIGUSR2', () => {
    server.close(() => {
        console.log(`[NODE] Express exited! Port ${config.application.port} is now free!`);
        process.kill(process.pid, 'SIGUSR2');
    });
});
