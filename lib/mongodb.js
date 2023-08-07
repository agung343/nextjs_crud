import mongoose from "mongoose";

const ConnectMongoDB = async() => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log("Internal Server Error")        
    }
}

export default ConnectMongoDB;
