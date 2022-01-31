var fs = require('fs');

//create new file & overwrite the text
/*
fs.writeFile('mycode.txt',"My First Class",function(err){
    if(err) throw err;
    console.log('File Created')
})

//create new file & append the text
fs.appendFile('mytext.txt',"My Test Class \n",function(err){
    if(err) throw err;
    console.log('Task Completed')
})

//Read file
fs.readFile('mytex.txt','utf-8',function(err,data){
    if(err) throw err;
    console.log(data)
})

fs.unlink('mycode.txt',function(err){
    if(err) throw err;
    console.log('File Deleted')
})
*/

fs.rename('mytext.txt','mycode.txt',function(err){
    if(err) throw err;
    console.log('File Renamed')
})