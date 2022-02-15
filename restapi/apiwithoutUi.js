const express = require('express');
const app = express();
const port = process.env.PORT || 6800;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongourl = "mongodb+srv://local:test12345@cluster0.f8vmc.mongodb.net";

let db;
let col_name = "febuser";

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.status(200).send('Health Ok')
})

app.get('/health',(req,res) => {
    res.status(200).send('Health Ok')
})

//Read
app.get('/users',(req,res) => {
    let query = {};
    if(req.query.city && req.query.role){
        query ={city:req.query.city,role:req.query.role,isActive:true}
    }
    else if(req.query.city){
        query ={city:req.query.city,isActive:true}
    }else if(req.query.role){
        query ={role:req.query.role,isActive:true}
    }else if(req.query.isActive){
        let isActive = req.query.isActive;
        if(isActive == "false"){
            isActive = false
        }else{
            isActive = true
        }
        query = {isActive}
    }
    else(
        query ={isActive:true}
    )
    db.collection(col_name).find(query).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
})

// Add User > post
app.post('/addUser',(req,res)=>{
    //console.log(req.body)
    db.collection(col_name).insert(req.body,(err,result) => {
        if(err) throw err;
        res.status(200).send('User Added')
    })
})

//DB connection
MongoClient.connect(mongourl,(err,client) => {
    if(err) console.error(`Error While Connecting`);
    db = client.db('febnode22');
    app.listen(port,(err) =>{
        console.log(`App running on port ${port}`);
    })
})
