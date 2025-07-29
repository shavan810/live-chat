import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app=express()
const port=process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send("hello i am shavan singh");
})

app.listen(port,()=>{
    console.log(`server is started http://localhost:${port}`);
    
})