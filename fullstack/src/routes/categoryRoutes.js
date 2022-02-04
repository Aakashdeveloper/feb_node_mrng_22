let express = require('express');
let categoryRoutes = express.Router();


var category = [
    {
        "id":1,
        "category": "Fashion",
        "thumb":"https://i.ibb.co/56VP0Fn/cloths.jpg"
    },
    {
        "id":2,
        "category":"Electronics",
        "thumb":"https://i.ibb.co/pw5Wtdx/appliances.jpg"
    },
    {
        "id":3,
        "category":"Essentials",
        "thumb":"https://i.ibb.co/0cw34xm/essentials.jpg"
    },
    {
        "id":4,
        "category": "Footwear",
        "thumb":"https://i.ibb.co/r3SZq8S/footware.jpg"
    }
]

function router(menu){

    categoryRoutes.route('/')
        .get(function(req,res){
            res.render('category',{title:'Category',data:category,menu})
        })

    categoryRoutes.route('/details')
        .get(function(req,res){
            res.send('Category Details')
        })

    return categoryRoutes

}

module.exports = router