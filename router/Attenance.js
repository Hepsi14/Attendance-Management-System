import express from 'express'
import { Attenance,Update } from '../controller/Attenance.js'
import Admin from '../middleware/Admin.js'
import auth from '../middleware/auth.js'
import hod from '../middleware/hod.js'
const router=express.Router()
//Attenance post
router.post('/Register',[auth,hod],Attenance)
//Attenance update
router.put('/Update',[auth,Admin],Update)
// router.post('/login',Login)

export default router