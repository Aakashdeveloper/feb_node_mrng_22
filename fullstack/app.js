let express = require('express');
let app = express();
let dotenv = require('dotenv')
dotenv.config()
let port = process.env.PORT || 8690;
let morgan = require('morgan');
let fs = require('fs');
let categoryRoutes = require('./src/routes/categoryRoutes');
let productRoutes = require('./src/routes/productRoutes');

// save app logs in file
app.use(morgan('common',{stream:fs.createWriteStream('./app.log')}))
// static file path
app.use(express.static(__dirname+'/public'))
// html file path
app.set('views','./src/views')
// view engine
app.set('view engine', 'ejs')

let catData = [
    {
        "id":1,
        "name":"Shopping",
        "image":"https://i.ibb.co/56VP0Fn/cloths.jpg",
        "link":"/category"
    },
    {
        "id":2,
        "name":"Restaurants",
        "image":"https://b.zmtcdn.com/data/pictures/chains/3/6303/640252389ddc3f264dd0e9f2741e73cd.jpg",
        "link":"/restaurants"
    }
]

app.get('/',function(req,res){
    res.render('index',{title:'Home Page',data:catData})
})

app.use('/category', categoryRoutes);
app.use('/products', productRoutes);

app.listen(port, function(err){
    if(err) throw err
    console.log(`Server running on port ${port}`)
})