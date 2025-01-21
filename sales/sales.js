

const sales = async(req,res) => {
    try {
        let sales = await req.db.collection("sales").insertOne(req.body)
        res.status(201).json({message:"sales created",sales:sales})
    } catch (error) {
        res.status(500).json({message:"internal server error",error:error})
    }
}

// aggrigations

const groupAggrigation = async (req, res) => {
    try {
        const result = await req.db.collection("sales").aggregate([
            {
                $group: {
                    _id: "$category", 
                    totalSales: { $sum: "$price" }, 
                    averageSales: { $avg: "$price" }, 
                    count: { $count: {} }
                }
            },
        ]).toArray();

        res.status(200).json({ message: "Group Aggregation", data: result });
    } catch (error) {
        res.status(500).json({ message: "Error Occurred", error: error.message });
    }
};



const matchAggregation = async (req,res) => {
    try {
        let result = await req.db.collection("sales").aggregate([
            {
                $match:{
                    age:{$gte:25 , $lte:40}
                }
            }
        ]).toArray()
        res.status(200).json({message:"get results sucess",data:result})
    } catch (error) {
        res.status(500).json({ message: "Error Occurred", error: error.message });
    }
}

const sortAggregation = async(req,res) => {
    try {
        let result = await req.db.collection("sales").aggregate([
            {
                $sort:
                {price:1}
            }
        ]).toArray()
        res.status(200).json({message:"sort Aggregation", data:result})
    } catch (error) {
        res.status(500).json({ message: "Error Occurred", error: error.message });
    }
}

const projectAggregation = async(req,res) => {
    try {
        let results = await req.db.collection("sales").aggregate([
            {
                $project:{
                    _id:0,
                    name:1,
                    product:1
                }
            }
        ]).toArray()
        res.status(200).json({message:"sucess",data:results})
    } catch (error) {
        res.status(500).json({ message: "Error Occurred", error: error.message });
    }
}


module.exports = {sales,projectAggregation, sortAggregation,groupAggrigation,matchAggregation}