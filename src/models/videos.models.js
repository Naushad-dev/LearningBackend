import mongoose, { Schema } from "mongoose";

const videoSchema = new mongoose.Schema({

    videoFile:{
        type:String, // cloudinary url
        required:true
,    },
thumbnail:{
    type:String,
    required:true
},

owner:{
  type: Schema.Types.ObjectId,
  ref:"User",
  required:true 
},
title:{
    type:String,
    required:true,
    index:true,
    unique:true,
    trim:true
},
description:{
    type:String,
    required:true,
   
},
duration:{
    type :Number,
    required:true
},
views:{
    type :Number,
    default:0
},
isPublished:{
    type:Boolean,
    required:true
}

},{timestamps:true});

export const Video= mongoose.model("Video",videoSchema)