import { User } from "../models/user.models.js";
import { ApiError } from "../utils/API_ERROR.js";
import { ApiRespone } from "../utils/ApiRes.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


//generating Acess token and refresh token

const generateAccessAndRefreshToken =async (userId)=>{
try {
    const user= await User.findById(userId);
    const AccessToken= user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()

    user.refreshToken=refreshToken

    await user.save({validateBeforeSave:false})

    return {AccessToken,refreshToken}
    
} catch (error) {
    throw new ApiError(500,"Something went wrong in token generation")
    
}

}


const registerUser = asyncHandler(

    async (req, res) => {
        //get user info from frontend***
        //validation of info like empty or convention***
        //check is user already exist: username , email***
        //check for avatar and coverImage***
        //upload on cloudinary : avatar***
        // create user - creating entry in Db
        // remove password and refresh token field from response
        // check for user creation
        // return res


// taking data from frontend req.body
        const {fullName,username,email,password} = req.body  // here username ,password etc must be same as of schema
   
        console.log(req.body) //;
        //now validate and check that all field are empty or not

        if(!fullName || !username || !email || !password ){
            throw new ApiError(400,"All fields are required",)
        }
         //above code can 👆 can be also written in this 👇
        if(
            [fullName,username,email,password].some((field)=> field?.trim() === "")
        ){
            throw new ApiError(400,"All fields are required",) 
        }

        //find wheather user in already existed or not using email and username

        const existedUser= await User.findOne({
            $or:[{username},{email}]
        })

        if(existedUser){
            throw new ApiError(409,"User Already exists ")
        }


        // check for avatar and coverImages

    //    TODO:  console.log(req.files) read what we get using req.files

        const avatarLoacalPath= req?.files?.avatar[0]?.path
        // const coverImageLocalPath =req?.files?.avatar[0]?.path
        console.log(req.files)

  
        //TODO:do same for coverImage
        let coverImageLocalPath;
        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
            coverImageLocalPath = req.files.coverImage[0].path
        }
        

        if(!avatarLoacalPath){
            throw new ApiError(400,"Avatar is required")
        }
// uploading images to cloudinary
       const avatar= await uploadOnCloudinary(avatarLoacalPath);
        const coverImage=await uploadOnCloudinary(coverImageLocalPath)
  // creating user
          const user = await User.create({
            fullName,
            avatar: avatar?.url || "",
            coverImage:coverImage?.url || "",
            email,
            password,
            username:username.toLowerCase()
          })
       // removing password and refreshToken
          const createdUser= await User.findById(user._id).select( "-password -refreshToken")
    
          if(!createdUser) {
            throw new ApiError(500,"something went wrong user is not created")
          }

          //send res

          return res.status(201).json(
            new ApiRespone(200, createdUser,"User is successfully register")
          )







    })


 const LoginUser=asyncHandler(
async(req,res)=>{

    //get req from user
    //take username or email
  // find user in DB
  // check password
  //access token and refresh token generation
  //send cookies


    const{username,email,password}= req.body
    
    if(!username && !email){
        throw new ApiError(400,"username and password is required")
    }

    // now find the user in DB
    const user= await User.findOne({
        // to find user i have to give either email or username or i can give both using $or operator

       $or:[{username},{email}]

    })

    //check wheather user exist in DB or not

    if(!user){
        throw new ApiError(404,"User not found")
    }

    //validate user using password

    const isPasswordValid=await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(400,"invalid password")
    }


        const{AccessToken,refreshToken} =await generateAccessAndRefreshToken(user._id)

        const loggedInUser=  User.findById(user._id).select("-password -refreshToken")



     //now send cookies 
     //creating option so cookies can be set from backend only

     const options={
        httpOnly:true,
        secure:true
     }


}

 )   


const allUsers =asyncHandler(
 async(req,res)=>{

    const data=await User.find();

    res.status(200).json(data)

    }
)   

export { registerUser , allUsers}

