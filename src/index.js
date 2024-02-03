import ConnectDB from "./database/connection.js";
// const dotenv= require("dotenv");
import dotenv from "dotenv"

dotenv.config({path:"./env"})

ConnectDB();
