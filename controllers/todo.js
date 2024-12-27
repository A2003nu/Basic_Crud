const { connectToDB }=require("../utils/connect");
const Todo=require("../models/todoModel");
const { createError }=require('../utils/error');
module.exports.getAllTodos = async(req,res,next) => {
await connectToDB();
const todos = await Todo.find({ userID:req.user.id });
res.status(200).send(todos);
}
module.exports.getTodo=async(req,res,next)=>{
    try{
        await connectToDB();
        const todo = await Todo.findById(req.params.id);
        if(!todo) return next(createError(404,"Todo not found"));
        if(todo.userID!=req.user.id) return next(createError(401,"Unauthorized"));
        res.status(200).send(todo);
    }
    catch(error){
        next(createError(401,"Unauthorized"));
    }
}
module.exports.updateTodo=async(req,res,next)=>{
    const id=req.params.id;
    if(!req.body) return next(createError(404,"Missing fields"));
    try{
        await connectToDB();
        const todo=await Todo.findById(id);
        if(todo.userID!=req.user.id) return next(createError(401,"Unauthorized"));
        todo.title=req.body.title || todo.title;
        if(req.body.isCompleted != undefined){
            todo.isCompleted=req.body.isCompleted;
        }
        await todo.save();
        res.status(200).json({message:"Todo updated successfully"});

    }
    catch(error){
return next(createError(404,"Todo not found"));
    }
}
module.exports.deleteTodo=async(req,res,next)=>{
    try{
        await connectToDB();
        const todo=await Todo.deleteOne({
            _id:req.params.id,
        userID:req.user.id,
    });
        if(!todo.deletedCount) return next(createError(404,"Todo not found"));
        
        res.status(200).json({message:"Todo deleted successfully"});
    }
    catch(error){
        return next(createError(404,"Todo not found"));
    }
}
module.exports.addTodo=async(req,res,next)=>{
    console.log(req.body);
    if(!req.body || !req.body.title ){
return next(createError(404,"Title is required"));
    }
    await connectToDB();
    const newTodo=new Todo({...req.body,userID:req.user.id});
    newTodo.save();
    res.send(newTodo);
}