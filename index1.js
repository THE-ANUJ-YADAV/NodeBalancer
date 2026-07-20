const express = require("express")

const app = express()

app.get('/',(req,res)=>{
    setTimeout(()=>{
        res.send("Response is coming from server 1")
    },3000)
})

app.listen(3001,()=>{
    console.log("Server 1 is running on port 3001")
})