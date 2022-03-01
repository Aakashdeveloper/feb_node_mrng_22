const express = require('express');
const app = express();
const port = 8700;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Pool = require('pg').Pool;
const pool = new Pool({
    user:'',
    host:'127.0.0.1',
    database:'postgres',
    port:5432
})

app.get('/',(req,res) => {
    pool.query('SELECT * FROM employee',(err,result) => {
        if(err) throw err;
        res.send(result.rows);
    })
})

app.post('/add',(req,res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let role = req.body.role;
    let id = req.body.id;
    pool.query('insert into employee(fname,lname,role,id) VALUES ($1,$2,$3,$4)',([fname,lname,role,id]),
    (err,result) => {
        if(err) throw err;
        res.send(result.rows)
    })
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})