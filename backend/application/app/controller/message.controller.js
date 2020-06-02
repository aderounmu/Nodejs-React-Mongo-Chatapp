
const ObjectID = require('mongodb').ObjectID
const Query = require('../helpers/queries.js')
module.exports = class messageController{
    constructor(){
        
    }

     //controller to get all messages in a chat
    static index(db){
        return (req,res) => {
            const dbo = db.db('chatapplication')
            let chatquery = {'chat.id': req.params.id}
            let collection = 'messages'
            Query.find(dbo,collection,chatquery,true)
            .then(result => res.send({'data': result}))
            .catch( err => res.send({'error': err}) )
        }
    }

    //controller to show details of a message

    static show(db){

        return (req,res)=>{
            const dbo = db.db('chatapplication')
            let userquery = {'_id': new ObjectID(req.params.id)}
            let collection = 'messages'
            Query.find(dbo,collection,userquery)
            .then(result => res.send({'data': result}))
            .catch( err => res.send({'error': err}) )
        }

    }

    //controller to create a new message in a chat 

    static create(db){
        return (req,res)=>{
            
            const dbo = db.db('chatapplication')
            let collection = 'messages'
            // let newMessage= {
            //     message : 'Hello friends',
            //     sender : {
            //         id : "5ec1f4f5ee84cb26b4b37c37",
            //         name : "Janet Row"
            //     },
            //     chat : {
            //         id : "5ec2c1c167c9341a4099463f",
            //         name : "Visaionic messaging Project"
            //     },
            //     created: new Date().toISOString()

            // }
            let newMessage= {
                message : req.body.message,
                sender : req.body.sender,
                chat: req.body.chat,
                created: req.body.created,
                status: "unread"
            }
            //first create the message 
            Query.insert(dbo,collection,newMessage)
            .then(result =>{ 

                let chatcol = 'chat'
                let chatquery = {"_id":new ObjectID(result.chat.id)}
                let chatupdate = {
                    $set :{
                        "last_chat" : {
                            "message":{
                                "id" : result._id,//.toString(), //convert this object id to sting
                                "text" : result.message
                            },
                            "sender" : result.sender,
                            "created" : result.created
                        }
                    }
                }
                //then update the last message of the chat 
                Query.update(dbo,chatcol,chatquery,chatupdate)
                //.then(result =>{ })
                .catch( err => res.send({'error': err}))
                res.send({'data': result})
            })
            .catch( err => res.send({'error': err}))
        
        }
    }


    
}