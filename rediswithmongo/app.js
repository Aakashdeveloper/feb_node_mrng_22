let express = require('express');
let redis = require('redis');
let mongodb = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017";
let app = express();
let port = process.env.PORT || 6543;

const client = redis.createClient({
    host:'localhost',
    port:6379
})

app.get('/data',(req,res) => {
    const userInput = (req.query.color).trim()
    // check data in redis
    client.get(`${userInput}`,(err,result) => {
        //return from redis
        if(result){
            const output = JSON.parse(result);
            res.send(output)
        }else{
            // get data from mongodb
            mongodb.connect(url,(err,dc) => {
                if(err){
                    res.send('Error While Connecting')
                }else{
                    let dbObj = dc.db('febnode');
                    dbObj.collection('products').find({Color:userInput}).toArray((err,data) => {
                        if(err){
                            res.send('Error While Fetching')
                        }else{
                            //save data in redis
                            client.setex(`${userInput}`,3600,JSON.stringify({source:'Redis',data}))
                            //first time return form db
                            res.send({source:'Mongo',data})
                        }
                    })
                }
            })
        }
    })
})

app.listen(port,() => {
    console.log(`listening on port ${port}`)
})