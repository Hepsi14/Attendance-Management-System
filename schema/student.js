import mongoose from "mongoose";
import Joi from 'joi'

const Student=mongoose.model('Student',new mongoose.Schema({
  regno:{
    type: String,
    required: true,
    uppercase: true,
    unique: true
  },
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
isAdmin:{
  type:Boolean,
  default:false
},
}));

const validateStudent= (value) => {
    const schema = Joi.object({
      name: Joi.string().min(),
      dept:Joi.string(),
      password:Joi.string().min(5),
      regno:Joi.string(),
      email:Joi.string(),
    });
    const result = schema.validate(value)
  
    return result  
  };

export default Student;

export {validateStudent}