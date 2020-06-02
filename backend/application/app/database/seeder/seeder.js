
const chats = require('./samplemessage.js')
const messages = require('./samplechat.js')
const users = require('./sampleuser.js')

module.exports = function(app,db){

    const dbo = db.db('chatapplication')
    seeder(dbo,'users',users)
    .catch(err => console.log(err))
    .then(result => console.log(result))
    .then(result => seeder(dbo,'chats',chats))
    .catch(err => console.log(err))
    .then(result => console.log(result))
    .then(result => seeder(dbo,'messages',messages))
    .catch(err => console.log(err))
    .then(result => console.log(result))
}


function seeder(db,collection,items){
    return new Promise((resolve,reject) => {
        db.collection(collection).insertMany(items,(err,result)=>{
            if(err) {
                console.log(items)
                reject({'error ': err})
                //res.send({'error': err})
            }else{
                //res.send(result.ops[0])
                //res.send(items)
                resolve(result)
            }
        }

        )
    })
}

