const jwt = require("jsonwebtoken")

async function identifyUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"UnAuthourized Access"
        })
    }

    let decode = null
    try{
        decode = jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"UnAuthorised Access"
        })
    }

    res.user = decode
}

module.exports = identifyUser