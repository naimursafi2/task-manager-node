const express = require("express");
const router = express.Router();
const authRoute = require("./authroute")

router.get("/",(req,res)=>{
    res.status(200).send("Hello from Server")
})



router.use("/auth",authRoute)

module.exports = router;