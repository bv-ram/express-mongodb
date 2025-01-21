
const createUser = async (req, res) => {
    try {
        const result = await req.db.collection("newUsers").insertOne(req.body);
        res.status(201).json({ message: "User created successfully", data: result });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

const getAllUsers = async (req,res) => {
    try {
        let allUsers = await req.db.collection("newUsers").find().toArray()
        res.status(200).json({message:"data recieved",users:allUsers})
    } catch (error) {
        res.status(500).json({message:"internal Server Error",error:error})
    }
}

const findUserByName = async (req,res) => {
    try {
        let user = await req.db.collection("newUsers").findOne({name:req.params.name})
        res.status(200).json({message:"user Found",user:user})
    } catch (error) {
        res.status(500).json({message:"internal Server Error",error:error})
    }
}

const updateUser = async (req,res) => {
    try {
        let update = await req.db.collection("newUsers").updateOne({name:req.params.name},{$set:req.body})
        res.status(200).json({message:"user updated", user:update})
    } catch (error) {
        res.status(500).json({message:"internal Server Error",error:error})
    }
}

const totalRecordsCount = async (req,res) => {
    try {
        let ttRecords = await req.db.collection("newUsers").countDocuments()
        res.status(200).json({message:"total Count",count:ttRecords})
    } catch (error) {
        res.status(500).json({message:"internal Server Error",error:error})
    }
}

const filter = async (req,res) => {
    try {
        let filterUsers = await req.db.collection("newUsers").find({age:{$lt:25}}).toArray()
        res.status(200).json({message:"filter Successfully", filterData:filterUsers})
    } catch (error) {
        res.status(500).json({message:"internal Server Error",error:error})
    }
}

const paginate = async (req,res) => {
    try {
        const page = parseInt(req.query.page || 1)
        const limit = parseInt(req.query.limit || 10)
        console.log(page,limit);
        const skip = (page - 1) * limit
        const collection = req.db.collection("newUsers")
        const total = await collection.countDocuments()
        let pagination = await collection.find().skip(skip).limit(limit).toArray()
        console.log(pagination,'pagination');
        res.status(200).json({message:"pagination success", page,limit,totalItems:total,totalPages:Math.ceil(total / limit),pagination})
    } catch (error) {
        res.status(500).json({message:"internal Server Error",error:error})
    }
}



const projection = async (req,res) => {
    try {
        let projection = await req.db.collection("newUsers").find({}, {projection:{name:1,age:1,_id:0}}).toArray()
        res.status(200).json({message:"projection",res:projection})
    } catch (error) {
        res.status(500).json({message:"internal Server Error",error:error})
    }
}

const createIndex = async (req,res) => {
    try {
        let index = await req.db.collection("newUsers").createIndex({name:1})
        res.status(200).json({message:"index Created",res:index})
    } catch (error) {
        res.status(500).json({message:"internal Server Error",error:error})
    }
}

const searchApi = async (req,res) => {
    try {
        let searchResults = await req.db.collection("newUsers").find({name:{$regex:req.params.name, $options:"i"}}).toArray()
        res.status(200).json({message:"search results", res:searchResults})
    } catch (error) {
        res.status(500).json({message:"internal Server Error",error:error})
    }
}
const sortApi = async (req,res) => {
    try {
        let sorting = await req.db.collection("newUsers").find().sort({name:1}).toArray()
        res.status(200).json({message:"sorted results",sort:sorting})
    } catch (error) {
        res.status(500).json({message:"internal Server Error",error:error})
    }
}

const uploadFile =  (req,res)=>{
    const file = `http://localhost:3000/uploads/${req.file.filename}`
    res.status(200).json({message:"uploaded successfully", file:file})
}

const uploadFiles = (req,res) => {
    const files = req.files.map((file) => ({
        filename:file.filename,
        path:`http://localhost:3000/uploads/${file.filename}`
    }))
    res.status(200).json({message:"upload files successfully",links:files})
}


module.exports = {uploadFiles,createUser,sortApi,uploadFile,getAllUsers,findUserByName,updateUser,totalRecordsCount,filter,paginate,projection,createIndex,searchApi}