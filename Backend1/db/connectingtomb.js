import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
const connectomongodb = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
           
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

export default connectomongodb