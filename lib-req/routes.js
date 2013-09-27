var Class = require('jsclass/src/core').Class
    , Route = new Class({
        initialize: function(route, path) {
            this.name = route;
            this.path = path;
        },
        spawn: function(message, next) {
            require('../lib-req/actor')(this.path, message, next);
        }
    })
    , routes = {};

module.exports = {
    add: function(route, path) {
        routes[route] = new Route(route, path);
    },
    resolve:function(route, message) {
        try {
            if (routes[route] == undefined) {
                throw new Error("Route " + route + " doesn't exists");
            } else {
                var next = function(message) {

                };

                routes[route].spawn(message, next);
            }
        } catch (e) {
            console.log(e);
        }
    }
};