const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.send("done")
})

app.listen(port,()=>{
    console.log('server is hosted on :',port);
})