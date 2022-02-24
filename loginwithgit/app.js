const express = require('express');
const app = express();
const superagent = require('superagent');
const request = require('request');
const port = 8700;
const cors = require('cors');
app.use(cors())

app.get('/',(req,res) => {
    res.send('<a href="https://github.com/login/oauth/authorize?client_id=6620addaebfe96489ead">Login With Git</a>')
})

app.get('/profile',(req,res) => {
    const code = req.query.code;
    if(!code){
        res.send({
            success: false,
            message: 'Unauthorised access'
        })
    }
    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'6620addaebfe96489ead',
            client_secret:'a4db13f8886954016ba0ae1dc432f15a0932973f',
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) => {
            if(err) throw err;
            let access_token = result.body.access_token;
            const option = {
                url:'https://api.github.com/user',
                method:'GET',
                headers:{
                    'Authorization':`token ${access_token}`,
                    'Accept':'application/json',
                    'User-Agent':'mycode'
                }
            }
            request(option, (err,response,body) => {
                res.send(body)
            })
        })
})

app.listen(port,() => {
    console.log('listening on port 8700');
})