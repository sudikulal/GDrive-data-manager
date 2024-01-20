const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = process.env.PORT || 3000; 

const downloadRoute = require('./src/routes/download.route.js')
const uploadRoute = require('./src/routes/upload.route.js')


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(downloadRoute)
app.use(uploadRoute)

app.get('/',(req,res)=>{
    res.send("done")
})

app.listen(port,()=>{
    console.log('server is hosted on :',port);
})