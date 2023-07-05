import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken'
import Hod from "../schema/hod.js";

const Register=async(req,res)=>{
    const Email = req.body.name
    console.log(Email);
    const {error}=(req.body)
    if (error){
        return res.status(400).send(error.details[0].message);
    }

    const exuser=await Hod.findOne({name:Email});
    if (exuser) {
        res.status(400).send("email is already taken");
    }else{
        try {
            console.log(req.body.name);
            let hash=await bcrypt.hash(req.body.password,10);

            let user=new Hod({ 
                name:req.body.name,
                email:req.body.email.toLowerCase(),
                password:hash,
                dept:req.body.dept,
            });
            let result=await user.save();
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error.message)
        }}
}

const Login= async (req,res)=>{
    try{
        
        const user=await Hod.findOne({email:req.body.email},{})
        // res.send(user);
        if(user){                
                const token= jwt.sign({ email: user.email,isHod:user.isHod },'hidden')
                return res.header("x-auth",token).send(token)
                
                }
                else{
                   return res.send("INVALID EMAIL")
                }
      
    }catch(error){
        console.log(error.message);
    }
 

}
export {Register,Login}