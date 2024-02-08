
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";

const app= express();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static('public'))
app.use(express.json())

app.get("/",(req,res)=>res.send("Wroking my friend"))


//importing routes

import router from './routes/v1/user.routes.js';
import { User } from './models/user.models.js';


//using routes with middleware

app.use("/api/v1/users", router)
app.use("/api/v1/",router)

// const data= await User.findOne({})

// console.log(data);


export {app}

