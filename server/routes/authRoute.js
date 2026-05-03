const express = require("express");
const multer  = require('multer')
const upload = multer()

const {
  registration,
  verifyOTP,
  login,
  userProfile,
  updateProfile,
} = require("../controllers/authController");
const { authmiddleware } = require("../middleware/authmiddleware");
const router = express.Router();

router.post("/registration", registration);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/profile", authmiddleware, userProfile);
router.put("/update-profile",authmiddleware,upload.single("avatar"), updateProfile)

module.exports = router;
