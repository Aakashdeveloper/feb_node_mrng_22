var http = require('http');

// req >>> what we will send to server
// res >>> what we receive in return

var server = http.createServer(function(req,res){
    res.write('<h1>This is node server2</h1>');
    res.end()
})

server.listen(5670)
