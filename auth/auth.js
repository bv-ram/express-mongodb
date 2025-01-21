const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ram";
const register = async (req,res) => {
    try {
        const {email,password} = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        let register = await req.db.collection("auth").insertOne({email,password:hashedPassword})
        res.status(201).json({message:"registered succecsfully", user:register})
    } catch (error) {
        res.status(500).json({message:"internal server error", error:error})
    }
}

const login = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await req.db.collection("auth").findOne({email})
        console.log(user,"user");
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:"Invalid Email or Password"})
        }
        const token = jwt.sign({_id:user._id,email:user.email}, JWT_SECRET, {expiresIn:"1h"})
        res.status(200).json({message:"Login Successfully",token:token})
    } catch (error) {
        res.status(500).json({message:"internal server error", error:error})
    }
}


module.exports = {register,login}