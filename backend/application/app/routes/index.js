const sampleRoutes = require('./sample.route.js')
const chatRoutes = require('./chat.route.js')
const messageRoutes = require('./message.route.js')
const userRoutes = require('./user.route.js')
module.exports = function (app,db) {

    sampleRoutes(app,db);
    chatRoutes(app,db);
    messageRoutes(app,db);
    userRoutes(app,db);
    

}