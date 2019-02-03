const Hapi = require("hapi");
const server = new Hapi.Server();
const mongoose = require("mongoose");
const User = require("./database_models/user_model");
const social_network_db = mongoose.connect("mongodb://localhost/social_network");

server.connection({port:3000});

server.start(console.log("test"));

server.route({
    method: "GET",
    path: "/",
    handler: function(request, reply) {
        reply.view("landing");
    }
});

server.register(require("vision"), function(err) {
    server.views({
        engines: {
            ejs: require("ejs")
        },
        relativeTo: __dirname,
        path: "views"
    });
});

server.register(require("inert"), function(err) {

});

server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
        directory: {
            path: "public"
        }
    }
});