const express = require('express');
const app = express();
const port = process.env.PORT || 6800;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongourl = "mongodb+srv://local:test12345@cluster0.f8vmc.mongodb.net";
const swaggerUi = require('swagger-ui-express');
const package = require('./package.json');
const swaggerDocument = require('./swagger.json');

swaggerDocument.info.version = package.version;
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

let db;
let col_name = "febuser";

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// static file path
app.use(express.static(__dirname+'/public'))
// html file path
app.set('views','./src/views')
// view engine
app.set('view engine', 'ejs')

app.get('/health',(req,res) => {
    res.status(200).send('Health Ok')
})

app.get('/',(req,res) => {
    db.collection(col_name).find({}).toArray((err,result) => {
        if(err) throw err;
        res.status(200).render('index',{data:result})
    })
})

//render Form
app.get('/new',(req,res) => {
    res.render('admin')
})

//find particular user
app.get('/user/:id',(req,res) => {
    let id = mongo.ObjectId(req.params.id)
    db.collection(col_name).find({_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
})

// Add User > post
app.post('/addUser',(req,res)=>{
    const data = {
        "name":req.body.name,
        "city":req.body.city,
        "phone":req.body.phone,
        "role":req.body.role?req.body.role:'User',
        "isActive":true
    }
    //console.log(req.body)
    db.collection(col_name).insert(data,(err,result) => {
        if(err) throw err;
        //res.status(200).send('User Added')
        res.redirect('/')
    })
})

//update user
app.put('/updateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                role:req.body.role?req.body.role:'User',
                isActive:true
            }
        },(err,result) => {
            if(err) throw err;
            res.status(200).send('Data updated')
        }
    )
})

// hardDelete
app.delete('/deleteUser',(req,res) => {
    db.collection(col_name).remove({_id:mongo.ObjectId(req.body._id)},(err,result) => {
        if(err) throw err;
        res.status(200).send('User Deleted ')
    })
})

//soft delete (deactivate)
app.put('/activateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:true
            }
        },(err,result) => {
            if(err) throw err;
            res.status(200).send('User Activated')
        }
    )
})

//Activate
app.put('/deactivateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:false
            }
        },(err,result) => {
            if(err) throw err;
            res.status(200).send('User DeActivated')
        }
    )
})

//DB connection
MongoClient.connect(mongourl,(err,client) => {
    if(err) console.error(`Error While Connecting`);
    db = client.db('febnode22');
    app.listen(port,(err) =>{
        console.log(`App running on port ${port}`);
    })
})
