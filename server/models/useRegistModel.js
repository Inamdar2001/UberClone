import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let UserRegister = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            require: true,
            minlength: [3, 'first name must be at least 3 characters long']
        },
        lastName: {
            type: String,
            require: true,
            minlength: [3, 'last name must be at least 3 characters long']
        },
    },
    email: {
        type: String,
        require: true,
        unique:true,
        minlength: [5, 'email must be at least 5 characters long']

    },
    password: {
        type: String,
        require: true,
        select:false,
    },
    socketId:{
        type:String
    }

});



UserRegister.pre("save", async function (next) {
    let user = this
    try {
        if (user.isModified('password')) {
            let hashPassword = await bcrypt.hash(user.password, 10,);
             user.password = hashPassword;
        }
        next()
    } catch (error) {
        next(error)
    }

});

UserRegister.methods.generateAuthToken = async function ( next) {

    try {
        let token=await jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY,);
          return token
    } catch (error) {
        next(error) 
    }

}


UserRegister.methods.comparePassword = async function (password, next) {

    let user = this;
    try {
        let isMatch = await bcrypt.compare(password, user.password);
        return isMatch
    } catch (error) {
        next(error)
    }

}


let Usermodel = new mongoose.model('User', UserRegister);


export default Usermodel