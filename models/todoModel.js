const mongoose=require('mongoose');
 const todoSchema=mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"Todo must have an owner"],
    },
    title:{
        type:String,
        required:[true,"Must provide a title."],
    },
    isCompleted:{
type:Boolean,
default:false,
    }
 });

 module.exports=mongoose.model("Todo",todoSchema);