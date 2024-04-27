const express = require('express')
const app = express();

app.get('/',(req,res)=>{
    res.send('server is running')
})

app.listen(8000,()=>{
    console.log('server is running on port 8000')
})