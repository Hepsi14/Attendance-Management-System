import bcrypt from "bcrypt";
import env from "dotenv/config";
import jwt from "jsonwebtoken";
import Staff from "../schema/admin.js";

const regStaff=async(req,res)=>{
    const saltRounds=10;
    const Cryptopass=await bcrypt.hash(req.body.password,saltRounds)
    var insert={
        name:req.body.name,
        email:req.body.email,
        password:Cryptopass,
        dept:req.body.dept        
    }
    // console.log(insert);
    try {
        const user=await Staff.findOne({name:req.body.name},{})
        // console.log(user);
    if(user){
        return res.status(400).send("User Already In")
    }
    else{
        var insert=await Staff.insertMany([insert])
        res.send(insert)
    }
    } catch (error) {
        res.send(error.messsage);
    }
}


const logStaff= async (req,res)=>{
    try{
        
        const user=await Staff.findOne({email:req.body.email},{})
        // res.send(user);
        if(user){                
                const token= jwt.sign({ email: user.email,isAdmin:user.isAdmin },'hidden')
                return res.header("x-auth",token).send(token)
                
                }
                else{
                   return res.send("INVALID EMAIL")
                }
      
    }catch(error){
        console.log(error.message);
    }

}




export {regStaff,logStaff}