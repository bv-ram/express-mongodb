const express = require("express")
const app = express()
const port = 4500

const users = [{id:1,name:"ramanjaneyulu"}]

app.use(express.json())
app.get('/users',(req,res) => {
    res.status(200).json(users)
})

app.post('/users', (req,res)=>{
    const newUser = {id:users.length + 1, ...req.body}
    users.push(newUser)
    res.status(201).json({message:"user created", user:newUser})
})

app.listen(port, ()=>{
console.log(`running on http://loclahost:${port}`);
})