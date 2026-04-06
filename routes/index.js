const express = require("express");
const router = express.Router();
const authRoute = require("./authroute")

router.get("/",(req,res)=>{
    res.status(200).send("Hello from Server")
})



router.use("/auth",authRoute)

module.exports = router;


//DB_URL = mongodb+srv://task-manager-node:8emKNBpeGp8tsUoT@cluster0.e3zsmrp.mongodb.net/taskManager?appName=Cluster0