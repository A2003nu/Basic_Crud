const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Must provide a email."],
        unique:[true,"Email must be unique."],
    },
    password:{
        type:String,
        require:[true,"Must provide a password."],
    },

});
module.exports=mongoose.model("User",userSchema);