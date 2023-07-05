import mongoose from "mongoose";
import Joi from "joi";

const staff={
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:true
    },
    isHod:{
        type:Boolean,
        default:false
    }
}

//validation
 const Validate=(value)=>{
    const schema=Joi.object({
        s_name:Joi.string().min(3),
        email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(5)

    })
 }

 const Staff=mongoose.model("Staff",staff)

export default Staff
export {Validate}