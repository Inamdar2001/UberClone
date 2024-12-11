import mongoose from "mongoose";


let dbConnect=(dbURL)=>{
    mongoose.connect(dbURL)
    .then(() => console.log('data base connected successfully'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));
};

export default dbConnect
