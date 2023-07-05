import express from 'express';
import bodyParser from 'body-parser';
import DB from './Config/DB.js';
import dotenv from 'dotenv'
// Staff Login Register
import Staff from './router/staff.js';
//Student login Register
import Stud from "./router/student.js"
//hod Login Register
import Hod from "./router/hod.js"
//Attenance Access
import post from "./router/Attenance.js"
const app=express();
dotenv.config()

DB()
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//Staff
app.use('/api/Staff',Staff)
//Student
app.use('/api/Student',Stud)
//hod
app.use("/api/HOD",Hod)
// Attenance
app.use("/api/attenance",post)
app.listen(2023,(req,res)=>{
    console.log("app listen in port 2023")
})