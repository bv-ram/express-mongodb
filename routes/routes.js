const { createUser , getAllUsers ,uploadFiles,uploadFile,sortApi,projection,searchApi,filter,createIndex, paginate,findUserByName,updateUser,totalRecordsCount} = require("../controllers/controllers")
const {sales,groupAggrigation,matchAggregation,projectAggregation,sortAggregation} = require("../sales/sales")

const {register,login} = require("../auth/auth")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const express = require("express")
const uploadier = path.join(__dirname,'uploads')
if(!fs.existsSync(uploadier)){
    fs.mkdirSync(uploadier)
}

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, uploadier)
    },
    filename: (req,file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

const router = express.Router()
console.log(createUser,'createUser');

router.post("/postUser",createUser)
router.get("/getAllUsers",getAllUsers)
router.get("/findUser/:name",findUserByName)
router.put("/update/:name",updateUser)
router.get("/recordsCount",totalRecordsCount)
router.get("/filter",filter)
router.get("/paginate", paginate)
router.get("/projection",projection)
router.get("/index",createIndex)
router.get("/search/:name",searchApi)
router.get("/sort",sortApi)
router.post("/upload",upload.single("file"), uploadFile)
router.post("/uploads",upload.array("files",10), uploadFiles)


// salesapis
router.post("/sales",sales)
router.get("/groupAgregate",groupAggrigation)
router.get("/matchAgregate",matchAggregation)
router.get("/sortAgregate", sortAggregation)
router.get("/projectAggregation",projectAggregation)

// authentication

router.post("/register",register)
router.post("/login",login)

// middleware



module.exports = router