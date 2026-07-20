const express = require('express')

const app = express()

app.get('/',(req,res)=>{
    setTimeout(()=>{
        res.send("Response is coming from server 3")
    },2000)
})

app.listen(3003,()=>{
    console.log("Server 3 is running on port 3003")
})
