const express = require('express')
const app = express();

const connection = require('./db/Configuration')

connection();


app.get('/',(req,res)=>{
    res.send('server is running')
})

app.get('/test',(req,res)=>{
    res.send('test the deployment')
})
app.listen(8000,()=>{
    console.log('server is running on port 8000')
})