

let ErrorMiddle=(err,req,res,)=>{
    res.status(400).json({
        message:err.message || "internal server error"
    })
};

export default ErrorMiddle