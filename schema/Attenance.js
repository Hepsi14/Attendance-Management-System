import mongoose from "mongoose";
import Joi from 'joi'

const attenance=mongoose.model('Attenance',new mongoose.Schema({
  regno:{
    type: String,
    // required: true,
    // uppercase: true,
    // unique: true
  },
  studentname:{
      type: String,
      required: true
  },
  dept:{
    type:String,
    required:true
},
status:{
  type:String,
  enum:["Present","Absent","Long Absent","On-Duty"],
  default:"Absent",
  required:true,
},
date:{
  type:String,
  required:true
},
DayOrder:{
  type:String,
  required:true
},
Faculty:{
  type:String,
  required:true
},
isAdmin:{
  type:Boolean,
  default:true
},
isHod:{
  type:Boolean,
  default:true
}
}));

// const validateStudent= (value) => {
//     const schema = Joi.object({
//       name: Joi.string().min(),
//       dept:Joi.string(),
//       password:Joi.string().min(5),
//       regno:Joi.string(),
//       email:Joi.string(),
//     });
//     const result = schema.validate(value)
  
//     return result  
//   };

export default attenance;

// export {validateStudent}