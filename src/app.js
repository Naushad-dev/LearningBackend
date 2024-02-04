
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


export {app}

