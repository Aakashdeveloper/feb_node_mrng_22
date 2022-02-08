let express = require('express');
let productRoutes = express.Router();
let mongodb = require('mongodb').MongoClient;
let url = process.env.mongourl;



function router(menu){

    productRoutes.route('/')
    .get(function(req,res){
        mongodb.connect(url,(err,dc)=>{
            if(err){
                res.status(500).send('Error while connecting')
            }else{
                var dbObj = dc.db('febnode');
                dbObj.collection('products').find().toArray((err,data) => {
                    if(err){
                        res.status(500).send('Error while fetching')
                    }else{
                        res.render('products',{title:'Products',data:data,menu})
                    }
                })
            }
        })
        
    })
    
    productRoutes.route('/details/:id')
    .get(function(req,res){
        let id = Number(req.params.id)
        mongodb.connect(url,(err,dc)=>{
            if(err){
                res.status(500).send('Error while connecting')
            }else{
                var dbObj = dc.db('febnode');
                dbObj.collection('products').find({category_id:id}).toArray((err,data) => {
                    if(err){
                        res.status(500).send('Error while fetching')
                    }else{
                        res.render('products',{title:'Products',data:data,menu})
                    }
                })
            }
        })
    })

    return productRoutes
}


module.exports = router