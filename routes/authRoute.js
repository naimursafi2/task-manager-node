const express = require("express");
const {
  registration,
  verifyOTP,
  login,
  userProfile,
} = require("../controllers/authController");
const { authmiddleware } = require("../middleware/authmiddleware");
const router = express.Router();

router.post("/registration", registration);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/profile", authmiddleware, userProfile);

module.exports = router;
