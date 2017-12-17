const baseController = require('./BaseController');

class IndexController extends baseController {
    constructor() {
        super();
    }

    /**
     * Default route
     *
     * @api {get} /api /api
     * @apiName api
     * @apiGroup General
     *
     * @apiSuccess {String} message A default api message
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Default API route!"
     *     }
     *
     * @param req
     * @param res
     */
    indexAction(req, res) {
        this.jsonResponse(res, 200, { 'message': 'Default API route!' });
    }
}

module.exports = new IndexController();
