var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res){
    fs.readFile('db.json', function(err,data){
        if(err) throw err;
        res.write(data);
        res.end();
    })
})

server.listen(8220)