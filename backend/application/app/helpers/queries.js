module.exports = class query{

static update(db,collection,query,item, m = false){

return new Promise((resolve,reject)=>{

    const col = db.collection(collection)
    
    if( m === true){

        col.updateMany(query,item,(err,result)=>{
            if(err){
                reject({'error':err})
            }else{
                resolve(result)
            }
        })

    }else{

        col.updateOne(query,item,(err,result)=>{
            if(err){
                reject({'error':err})
            }else{
                resolve(result)
            }
        })
        
    }

})

}

static insert(db,collection,item, m = false){

    return new Promise((resolve,reject)=>{
        const col = db.collection(collection)
        if(typeof(item) === Array || m === true){

            col.insertMany(item,(err,result)=>{
                if(err){
                    reject({'error':err})
                }else{
                    resolve(result.ops[0])
                }
            })

        }else{

            col.insertOne(item,(err,result)=>{
                if(err){
                    reject({'error':err})
                }else{
                    resolve(result.ops[0])
                    console.log(result.ops[0])
                }
            })
        }

    })

}

static find(db,collection,query,m = false){

    return new Promise((resolve,reject)=>{

        const col = db.collection(collection)

        if( m === true){

            col.find(query).toArray((err,result)=>{
                if(err){
                    console.log(result);
                    reject({'error':err})
                }else{
                    resolve(result)
                }
            })

        }else{
            col.findOne(query,(err,item)=>{
                if(err){
                    reject({'error':err})
                }else{
                    resolve(item)
                }
            }) 
        }
    })

}

static delete(db,collection,query, m=false){

    return new Promise((resolve,reject)=>{

        const col = db.collection(collection)

        if( m === true){

            col.deleteMany(query,(err,item)=>{
                if(err){
                    reject({'error':err})
                }else{
                    resolve(item)
                }
            })

        }else{

            col.deleteOne(query,(err,item)=>{
                if(err){
                    reject({'error':err})
                }else{
                    resolve(item)
                }
            })
            
        }
    })

}



}