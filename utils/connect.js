const mongoose=require('mongoose');
const connection= {
    isConnected:null
}
module.exports.connectToDB = async()=>{
    try{
        if(connection.isConnected){
            return;
        }
        const db=await mongoose.connect(process.env.MONGODB_URI);
        connection.isConnected=db.connections[0].readyState;
    }
    catch(error){
        console.error(`Failed to connect to MongoDB: ${error.message}`);
        process.exit(1);
    }
}