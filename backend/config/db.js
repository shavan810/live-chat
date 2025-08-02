import mongoose from "mongoose";

const conectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB is connected sucessfully...!");
        
    } catch (error) {
        console.log("DB is NOT connected...!");
    }
}

export default conectDB