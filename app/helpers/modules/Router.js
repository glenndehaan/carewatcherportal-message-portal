class Router {

    /**
     * An easy to use function to add multiple routes to the Express router
     *
     * @param router
     * @param routes
     * @param type
     */
    routesToRouter(router, routes, type) {
        for (let item = 0; item < routes.length; item += 1) {
            const route = routes[item];
            const controller = route.controller.charAt(0).toUpperCase() + route.controller.slice(1);
            let useMulter = '';
            if (route.useMulter) {
                useMulter = 'formData.array(),';
            }

            eval(
                `
                    ${route.useMulter ? 'const multer = require("multer"); const formData = multer();' : ''}
                    const ${route.controller}Controller = require('../../controllers/${type}/${controller}Controller');
                    router.${route.method}('${route.route}', ${useMulter} (req, res) => {
                        ${route.controller}Controller.${route.action}Action(req, res);
                    });
                `
            );
        }
    }
}

module.exports = new Router();
