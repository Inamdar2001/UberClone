import Usermodel from "../models/useRegistModel.js";


let createUser = async (firstName,lastName,email,password,next) => {
  console.log(next)
  try {
    if (!firstName, !lastName,!email, !password) {
      let fieldErrorRe = new Error("all field are required");
     return next(fieldErrorRe);
    }
    let user = await Usermodel.create({
      fullName:{
        firstName,
        lastName
      },
      email,
      password
    });
    return user

  } catch (error) {
    next(error)
  }
};


export default createUser