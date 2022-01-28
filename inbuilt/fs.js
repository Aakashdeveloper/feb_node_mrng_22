var fs = require('fs');

//create new file
fs.writeFile('mycode.txt',"this is node class",function(err){
    if(err) throw err;
    console.log('File Created')
})