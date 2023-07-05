import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from 'dotenv/config'

function hod(req,res,next){
    if (req.user.isHod ===true){
        next()
    }
    else{
        return res.status(403).send('assess denied')
    }
}
export default hod