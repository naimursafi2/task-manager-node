const express = require("express");
const {
  registration,
  verifyOTP,
  login,
  userProfile,
} = require("../controllers/authController");
const router = express.Router();

router.post("/registration", registration);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/profile", userProfile);

module.exports = router;
