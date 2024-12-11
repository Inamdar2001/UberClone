import express from "express";
import dbConnect from "./config/dbConet.js";
import dotenv from 'dotenv';
import userRoutes from "./Routes/userRegRoutes.js";
dotenv.config();

dbConnect(process.env.DB_URL);

 let app=express();

 app.use(express.json());
app.use('/user',userRoutes);

 let port=process.env.PORT;

app.listen(port,()=>{
    console.log(`server start at this port numbber ${port}`)
})