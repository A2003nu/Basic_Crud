const { createError }=require('../utils/error');
const { connectToDB }=require('../utils/connect');
const User=require('../models/userModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

module.exports.register= async (req,res,next)=>{
const data=req.body;

if(!data?.email || !data?.password){
    return next(createError(400,"Missing fields"));
}
await connectToDB();
const alreadyRegistered=await User.exists({email:data.email});
if(alreadyRegistered)
    return next(createError(400,"User already registered"));

const salt=bcrypt.genSaltSync(10);
const hash=bcrypt.hashSync(req.body.password);
const newUser=new User({ ...req.body,password:hash});
await newUser.save();
res.status(201).json("User created Succesfully!!");
}
module.exports.login=async (req,res,next)=>{
    const data=req.body;
console.log(data);
    if(!data?.email || !data?.password){
        return next(createError(400,"Missing fields"));
    }
    await connectToDB();
    const user=await User.findOne({email:req.body.email});
    if(!user)
        return next(createError(401,"Invalid credentials"));

    const isPasswordCorrect=bcrypt.compare(req.body.password,user.password);
    if(!isPasswordCorrect)
        return next(createError(401,"Invalid password"));
    const token=jwt.sign({id:user._id},process.env.JWT);
    console.log(token);
    res.cookie("access_token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
    })
    .status(200).json("User logged in");
}
module.exports.logout=async (req,res,next)=>{
    res.clearCookie("access_token",{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
    })
    .status(200).json("Logged out Successfully!!!");

}