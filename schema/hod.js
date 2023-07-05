import mongoose from "mongoose";
import Joi from 'joi'

const Hod=mongoose.model('HOD',new mongoose.Schema({
    name:{
        type: String,
        required: true
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
    isHod:{
        type: Boolean,
        default: true
    }
}));

const validateHod= (value) => {
    const schema = Joi.object({
      name: Joi.string().min(),
      dept:Joi.string(),
      email:Joi.string(),
      password:Joi.string().min(5),
    });
    const result = schema.validate(value)
  
    return result  
  };

export default Hod;

export {validateHod}