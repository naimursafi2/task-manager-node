const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const authSchema = new mongoose.Schema({
  avatar: {
    type: String,
    default: "",
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    default: null,
  },
  otpExpiry: {
    type: Date, 
  },
});

authSchema.pre("save", async function () {
  // যদি password change না হয় → skip
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10); // 10 = salt rounds
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    res.status(500).send({ message: "server error" });
  }
});

//password compare
authSchema.methods.comparePassword = async function (plainPass) {
  return await bcrypt.compare(plainPass, this.password);
};

module.exports = mongoose.model("user", authSchema);
