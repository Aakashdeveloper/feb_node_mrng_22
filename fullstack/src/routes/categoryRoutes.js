let express = require('express');
let categoryRoutes = express.Router();
let mongodb = require('mongodb').MongoClient;
const url = process.env.mongourl;


function router(menu){
    categoryRoutes.route('/')
        .get(function(req,res){
            mongodb.connect(url,function(err,dc){
                if(err){
                    res.status(500).send('Error while connecting')
                }else{
                    let dbObj = dc.db('febnode');
                    dbObj.collection('category').find().toArray(function(err,response){
                        if(err){
                            res.status(500).send('Error while fetching data')
                        }else{
                            res.render('category',{title:'Category',data:response,menu})
                        }
                    })
                }
            })
        })

    categoryRoutes.route('/details')
        .get(function(req,res){
            res.send('Category Details')
        })

    return categoryRoutes

}

module.exports = router