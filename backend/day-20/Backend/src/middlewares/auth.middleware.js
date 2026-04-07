const jwt = require("jsonwebtoken")

async function identifyUser(req,res,next){
    const token = req.cookies.token
    
        if(!token){
            return res.status(401).json({
                message:"UnAuthorized access token not found"
            })
        }
    
        let decoded 
        try{
            decoded = jwt.verify(token,process.env.JWT_SECRET)
        }catch(err){
            return res.status(401).json({
                message:"UnAuthorized access from err"
            })
        }

        req.user = decoded
        next()
}

module.exports = identifyUser