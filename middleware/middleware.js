const jwt = require("jsonwebtoken")
const JWT_SECRET = "ram";

const authMiddleware = (req,res,next) => {
    console.log(req.user,req,"midle");
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        res.status(401).json({message:"unauthorized user"})
    }
    try {
        const verified = jwt.verify(token,JWT_SECRET)
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({message:"Invalid Token"})
    }
}


module.exports = { authMiddleware };