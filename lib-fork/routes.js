var Class = require('jsclass/src/core').Class
    , fork = require('child_process').fork
    , childPort = 8000
    , Route = new Class({
        initialize: function(route, path) {
            this.name = route;
            this.path = path;
        },
        spawn: function(message) {
            var child = fork('./lib-fork/actor.js', ['-port', childPort, ' -file', this.path]);
            child.send(message);
            ++childPort;
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
                routes[route].spawn(message);
            }
        } catch (e) {
            console.log(e);
        }
    }
};