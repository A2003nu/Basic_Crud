const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const bodyParser = require("body-parser");
const cookieParser=require("cookie-parser");
const app=express();
const PORT=3000;

require("dotenv").config();
const corsOptions={
    origin: "http://localhost:5173",
    credentials: true, 
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/user", authRoutes);
app.use("/api/todos",todoRoutes);

app.get("/",(req,res,next)=>{
    res.send("Hello World!");
})

//gobal error handler
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal server error";
    res.status(statusCode).json({error: message});
})

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})