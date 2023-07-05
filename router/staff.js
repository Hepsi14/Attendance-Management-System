import express from "express";
import { regStaff,logStaff } from "../controller/admin.js";


const router=express.Router()

router.post("/Register",regStaff)

router.post("/login",logStaff)



export default router