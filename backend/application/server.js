const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const db =  require('./config/db.js')
const app = express();
//const seeder = require('./app/database/seeder/seeder')
const port = 9090;
const allowed_host = "http://localhost:3000"
app.use(function(req,res,next){
    res.header("Access-control-Allow-Origin",allowed_host)
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

MongoClient.connect(db.url, {native_parser : true, useUnifiedTopology: true}, (err, database)=>{
    if(err) return console.log(err)
    require('./app/routes')(app,database)

    //run seeder just once 
    //seeder(app,database)

    app.listen(port, ()=> {
        console.log('We are live on port' + port )
    })  
})