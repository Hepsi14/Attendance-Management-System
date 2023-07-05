import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken'
import Student from '../schema/Student.js';

const Register=async(req,res)=>{
    const Email = req.body.email
    console.log(Email);
    const {error}=(req.body)
    if (error){
        return res.status(400).send(error.details[0].message);
    }

    const exuser=await Student.findOne({email:Email});
    if (exuser) {
        res.status(400).send("email is already taken");
    }else{
        // try {
            console.log(req.body.name);
            let hash=await bcrypt.hash(req.body.password,10);

            let user=new Student({ 
                regno:req.body.regno,
                name:req.body.name,
                email:req.body.email.toLowerCase(),
                password:hash,
                dept:req.body.dept,
            });
            let result=await user.save();
            res.status(200).send(result)
        // } catch (error) {
        //     res.status(400).send(error.message)
        // }
    }
}

const Login=async(req,res)=>{
    const Email=req.body.email.toLowerCase();
    const pwd=req.body.password
    // console.log(pwd);
    try {
        const logUser=await Student.findOne({email:Email},{})//find all user using and condition
        // console.log(logUser.password);
        if (logUser) {
          const bhash=await  bcrypt.compare(pwd,logUser.password).then(function(result) {
                if(result) {
                    const token= jwt.sign({logUser},'hidden')
                    return res.header('x-auth',token).send(token)
                }
                else{
                      res.send("incorrect password")
               }
            });
        }
        if(!logUser){
        res.send("email is not valid");
        }
        
    } catch (error) {
        console.log(error)
    }

}



const Update=async (req,res)=>{
   
    const data=req.body
    // console.log(data);
    try {
        if(!req.body.RegNo && !req.body.email){
            let update=await Student.findOneAndUpdate({_id:req.user.id},{$set:data},{new:true})
            if(update){
                try {
                    res.status(200).send(update)
                } catch (error) {
                    res.status(400).send(error.message)
                }
            }else{
                console.log(req.user.id);
                res.send("student not found")
            }
        }else{
            res.send("you did not edit emil (or) RegNo")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
   
    
}
const ChangePassword=async(req,res)=>{
    try {
        let hash=await bcrypt.hash(req.body.password,10);

        let update=await Student.findOneAndUpdate({_id:req.user.id},{$set:{password:hash}},{new:true})
        res.status(200).send("updated Successfuly")
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const getAll = async(req, res) => {
    let result=await Student.find().select('-password')
    res.send(result)
}
const profileView=async(req, res) => {
    let result=await Student.findById({_id:req.user.id})
    res.status(200).send(result)
}
export {Register,Login}