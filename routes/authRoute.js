const express = require("express");
const { registration, verifyOTP } = require("../controllers/authController");
const router = express.Router();


router.post("/registration",registration);
router.post("/verify-otp",verifyOTP);

module.exports = router;