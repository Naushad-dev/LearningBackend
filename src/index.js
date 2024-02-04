import ConnectDB from "./database/connection.js";
// const dotenv= require("dotenv");
import dotenv from "dotenv"
import {app} from "./app.js"
dotenv.config({path:"./env"})

ConnectDB()
.then(()=>{

    app.listen(process.env.PORT || 8000, ()=>{
        console.log("Server is running on !!! ",process.env.PORT);
    })

})
.catch((error)=>{
  console.log("Error in running server !!",error);
});
