var express = require('express');
var axios = require('axios');
var createClient = require('redis').createClient;
var port = process.env.PORT ||1400;
var app = express();



app.get('/data',(req,res) => {
     // check in redis first
    //console.log(">>>>url",url)
    (async () => {
        const userInput = (req.query.country).trim()
        const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`
   
        const client = createClient({
            host:'localhost',
        port:6379});
      
        client.on('error', (err) => console.log('Redis Client Error', err));
      
        await client.connect();

        const response = await client.get(`${userInput}`)
        if(response){
            const output = JSON.parse(response);
            res.send(output)
        }
      })();

})

app.listen(port,(err) => {
    console.log(`Server is running on port ${port}`)
})