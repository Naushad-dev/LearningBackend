export const asyncHandler = (reqFunction) => async (req, res, next) => {
    try {

        await reqFunction(req, res, next)

    } catch (error) {
        console.log("Error from asyncHandler");
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }

}

// second method to define handler function

// export const asyncHandler=(reqFunction)=>{
//     return (req,res,next)=>{
//         Promise.resolve(reqFunction(req,res,next)).catch((err)=> next(err))

//     }
// }