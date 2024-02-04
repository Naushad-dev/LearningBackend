
import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET 
});

export const uploadOnCloudinary= async (localFilePath)=>{

   try {
    if(!localFilePath)  return null;

const respone =  await cloudinary.uploader.upload(localFilePath,{

        resource_type:"auto"
    })
    fs.unlinkSync(localFilePath)

    return respone;


    
   } catch (error) {

    fs.unlinkSync(localFilePath)
    return null;   

} 
}

