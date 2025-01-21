const express = require("express")
const axios = require("axios");
const userRouter = express.Router()

const url = 'http://localhost:4500'

userRouter.get('/', async(req,res) => {
    try {
        const response = await axios.get(`${url}/users`)
        console.log(response,"response");
        res.status(200).json({message:"data recieved", response:response.data})
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
})


userRouter.post("/", async(req,res) => {
    try {
        const response = await axios.post(`${url}/users`,req.body)
        res.status(201).json({message:"sucess", response:response.data})
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
})

module.exports = {userRouter}