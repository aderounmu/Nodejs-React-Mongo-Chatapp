const chatController = require('../controller/chat.controller')
const messageController = require('../controller/message.controller')

module.exports = function(app,db){
 
    //route to get all chats for a user
    app.get('/user/:id/chat',chatController.index(db))

    //route create a new chat 
    app.post('/chat',chatController.create(db))

    //route to get all details of chat 
    app.get('/chat/:id',chatController.show(db))

    //route to get all messages in a chat 
    app.get('/chat/:id/messages',messageController.index(db))
    
    //route to get a message 
    app.get('/message/:id',messageController.show(db))

    //route to create a new message in a chat 
    app.post('/message',messageController.create(db))

    //controller to read all messages in a chat 

    //app.get('read/:id/')


    //test
    // app.get('/message',messageController.create(db))


}