const express = require('express')
const app = express()
const port = 3000

const {authMiddleware} = require("./middleware/middleware")
const {userRouter} = require("./gatewayroutes/routes")
const userRoutes = require("./routes/routes")

const {MongoClient} = require('mongodb')

const url = 'mongodb+srv://ramu:QHOpGf3U6zmo9vmw@cluster0.b39h3vm.mongodb.net/'
const client = new MongoClient(url)
let DB
client.connect()
.then(() => {
    DB = client.db("server")
    console.log('connected');
})
.catch((error) => {
    console.log(error);
})

app.use(express.json())
app.use("/users", (req, res, next) => {
    req.db = DB
    next();
  }, userRoutes);

  
app.get("/welcome", authMiddleware, (req,res) => {
    res.status(200).json({message:"welcome to my api", user:req.user})
})

app.use('/users',userRouter)


app.listen(port, () => {
    console.log(`Server is Running On ${port}`);
})