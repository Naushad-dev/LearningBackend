import mongoose from "mongoose";
import { db_name } from "../constant.js";

const ConnectDB= async()=>{

    try {
        console.log(process.env.MONGO_URI);
       const db_instance= await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`)
       
       console.log(`\n MongoDB connected !! DB HOST:`);

    } catch (error) {
        console.log("Error from MOngonDB",error);
        process.exit(1);
        
    }

}

export default ConnectDB;