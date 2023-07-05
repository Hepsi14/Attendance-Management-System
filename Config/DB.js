import mongoose from "mongoose";

const config=async()=>{
   try {
    await  mongoose.connect('mongodb://localhost:27017/AMS')
    console.log("DBconected");
   } catch (error) {
    console.log("error",error);
   }
}

export default config;