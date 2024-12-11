import express from 'express';
import { UseRegiste,loginUser } from '../controller/userContro.js';
import { body } from 'express-validator';


let userRoutes=express.Router();


userRoutes.post('/register',[
    body('fullName.firstName').isLength({min:3,max:10}).withMessage("3 character is required in firstName or maximam required 10 "),
    body('password').isLength({min:6}).withMessage('password must atleast 6 character'),
    body('email').isEmail().withMessage("email is not valid"),
    
    
],UseRegiste);
userRoutes.post('/login',loginUser);

export default userRoutes