const { createError }=require('../utils/error');
const jwt=require('jsonwebtoken');

module.exports.verifyToken = (req,res,next) =>{
    const token=req.cookies?.access_token;
    if(!token)
        return next(createError(401,"Not authorized"));
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err)
            return next(createError(401,"Token is not valid"));
        req.user=user;
        next();
    });
}