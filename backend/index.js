import express from 'express'
import conectDB from './config/db.js'
import dotenv from 'dotenv'//store sensitive data in .env file 
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
dotenv.config()// aab use kar sakte hai .env mai sai data

const app=express()
const port=process.env.PORT || 5000



app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter);

app.get('/',(req,res)=>{
    res.send("hello i am shavan singh");
})

app.listen(port,()=>{
    conectDB()
    console.log(`server is started http://localhost:${port}`);
})