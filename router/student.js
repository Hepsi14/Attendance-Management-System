
import express from 'express'
import { Register,Login} from '../controller/student.js'

const router=express.Router()

router.post('/Register',Register)

router.post('/login',Login)

export default router