//const controller = require('./controller')
const bcrypt = require('bcrypt')
const Query = require('../helpers/queries.js')
const ObjectID = require('mongodb').ObjectID
module.exports = class chatController {

    constructor(){

    }
//controller create a new chat 
    static create(db,res,req){
        return (req,res)=>{
            const dbo = db.db('chatapplication')
            let collection = 'chat'
            let newItem = {
                chatname : req.body.chatname,
                chat_type : req.body.chat_type,
                recipient_id : req.body.recipient_id,
                recipient : req.body.recipient,
                last_chat : {},
                created : req.body.created
            }
            Query.insert(dbo,collection,newItem)
            .then(result => res.send({'data': result}))
            .catch( err => res.send({'error': err}) )
        }
    }

//controller to get all chats for a user
    static index(db){
        return (req,res)=>{
            const dbo = db.db('chatapplication')
            let userquery = {'recipient.id': req.params.id}
            let collection = 'chat'
            Query.find(dbo,collection,userquery,true)
            .then(result => res.send({'data': result}))
            .catch( err => res.send({'error': err}) )
        }
    }

 //controller to get all details of a chat 
    static show(db){
        return (req,res)=>{
            const dbo = db.db('chatapplication')
           let myquery = {'_id': new ObjectID(req.params.id)}
           let collection = 'chat'
           Query.find(dbo,collection,myquery) 
           .then(result => res.send({'data': result}))
            .catch( err => res.send({'error': err}) )
    
        }
    }


    //remove after set up is complete


    

}