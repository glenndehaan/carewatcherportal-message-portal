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
        route: '/admin/room',
        method: 'get',
        controller: 'Admin',
        action: 'room'
    },
    {
        route: '/admin/room/create',
        method: 'get',
        controller: 'Admin',
        action: 'createRoom'
    },
    {
        route: '/admin/room/edit/:id',
        method: 'get',
        controller: 'Admin',
        action: 'editRoom'
    },
    {
        route: '/admin/room/delete/:id',
        method: 'get',
        controller: 'Admin',
        action: 'deleteRoom'
    }
];

routerUtils.routesToRouter(router, routes, 'Web');

module.exports = router;
