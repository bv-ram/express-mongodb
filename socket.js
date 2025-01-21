const express = require("express")
const rateLimit = require("express-rate-limit")
const app = express()
const http = require("http")
const {Server} = require("socket.io")
const server = http.createServer(app)
const io = new Server(server)
let port = 5000

const limiter = rateLimit({
    windowMs : 1 * 60 * 1000,
    max:3,
    message:"Too many reqests for this Ip, Please Try After 1 Min",
    standardHeaders:true,
    legacyHeaders:false
})

app.use("/limiter",limiter)
app.get("/limiter", (req,res) => {
    res.send("pora nenu ranu")
})


app.get("/socket",(req,res)=> {
    res.sendFile(__dirname + '/index.html')
})


io.on('connection', (socket) => {
    socket.on('send name', (name)=> {
        io.emit('send name', (name))
    })

    socket.on('send message', (message) =>{
        io.emit('send message', (message))
    })
  
})


server.listen(port, ()=> {
    console.log(`server running on port ${port}`)
})

