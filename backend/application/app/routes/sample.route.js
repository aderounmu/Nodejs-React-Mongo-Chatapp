module.exports = function(app,db){
     app.get('/sample',(req,res)=>{
        //console.log(req.body)
        res.send('You are in a get request ')
     })
}