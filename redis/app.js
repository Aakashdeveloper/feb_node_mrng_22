let express = require('express');
let axios = require('axios');
let redis = require('redis');
let port = process.env.PORT || 6200
const app = express();
const client = redis.createClient({
    host:'localhost',
    port: 6379
})

app.get('/data',(req,res) => {
    let userInput = (req.query.country).trim();
    userInput = userInput?userInput:'India';
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`
    // check in redis first
    return client.get(`${userInput}`,(err,result) => {
        //if data is in redis
        if(result){
            const output = JSON.parse(result);
            res.send(output)
        }else{
            // as data is not in redis make api call and save data in redis
            axios.get(url)
                .then(response => {
                    // save the response in redis
                    const output = response.data;
                    client.setex(`${userInput}`,3600,JSON.stringify({source:'Redis Cache',output}))
                    // first time return response
                    res.status(200).send({source:'APi Response',output})
                })
        }
    }) 

})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})