import Usermodel from "../models/useRegistModel.js"
// import jwt from 'jsonwebtoken'
import createUser from "../services/userCreateServ.js";
import { validationResult } from "express-validator";

let UseRegiste = async (req, res, next) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty) {
      return next(error.array())
    };

    let { fullName, email, password } = req.body;
    let {firstName,lastName}=fullName
    let user =await createUser( firstName,lastName,email, password,next);
  
    let token = await user.generateAuthToken(next);

    res.status(200).json({
      message: 'user register successfully',
      User: user,
      token
    });

  } catch (error) {
    next(error)
  }

};


let loginUser = async (req, res, next) => {

  let { email, password } = req.body;
  try {
    let user = await Usermodel.findOne(email)

    if (!user) {
      res.status(400).json({
        success: false,
        message: "user is not found..."
      })
      let isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(400).json({
          success: false,
          message: 'invalid crediental '
        })
      }
      let token = jwt.sign({ id: user._id, JWT_SECRET_KEY, });

      res.status(200).json({
        success: true,
        message: "user login is successfully "
      }).cookie(token)

    }
  } catch (error) {

  }
}
export { UseRegiste, loginUser }