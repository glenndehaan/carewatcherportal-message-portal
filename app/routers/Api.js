/**
 * Import base packages
 */
const express = require('express');
const router = express.Router();
const routerUtils = require('../helpers/modules/Router');

/**
 * Define routes
 */
const routes = [
    {
        route: '/',
        method: 'get',
        controller: 'Index',
        action: 'index'
    },
    {
        route: '/message',
        method: 'get',
        controller: 'Message',
        action: 'index'
    },
    {
        route: '/message',
        method: 'post',
        controller: 'Message',
        action: 'create'
    },
    {
        route: '/admin/room',
        method: 'post',
        controller: 'Admin',
        action: 'room'
    }
];

routerUtils.routesToRouter(router, routes, 'Api');

module.exports = router;
