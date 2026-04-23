const { mailsender } = require("../helpers/mailService");
const cloudinary = require("../configs/cloudinary");
const {
  isvalidEmail,
  isValidPassword,
  generateOTP,
  generateAccessToken,
} = require("../helpers/utils");
const authSchema = require("../models/authSchema");
const {
  uploadToCloudinary,
  destroyFromCloudinary,
} = require("../helpers/CloudinaryService");

const registration = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName.trim())
      return res.status(404).send({ message: "FullName is required." });
    if (!email) return res.status(404).send({ message: "email is required." });
    if (!isvalidEmail(email))
      return res.status(404).send({ message: "email is invalid." });
    if (!password)
      return res.status(404).send({ message: "password is required." });
    if (!isValidPassword(password))
      return res.status(404).send({ message: "password is invalid." });

    //check if email already exist
    const existingEmail = await authSchema.findOne({ email });
    if (existingEmail)
      return res.status(404).send({ message: "This email already registerd." });

    //Generate OTP
    const OTP_Num = generateOTP();

    const user = await authSchema({
      fullName,
      email,
      password,
      otp: OTP_Num,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });
    user.save();

    await mailsender({
      email,
      subject: "OTP verification mail",
      otp: OTP_Num,
      fullName,
    });

    res
      .status(200)
      .send({ message: "Registration Successful Pleaze verify your email" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await authSchema.findOneAndUpdate(
      {
        email,
        otp,
        otpExpiry: { $gt: Date.now() },
      },
      { isVerified: true, otp: null },
      {
        returnDocument: "after",
      },
    );
    if (!user) return res.status(400).send({ message: "invalid request" });
    res.status(200).send({ message: "Email verified Successfully" });
  } catch (error) {
    res.status(500).send({ message: "internal server error!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authSchema.findOne({ email });
    if (!user) return res.status(400).send({ message: "invalid credentials." });
    if (!user.isVerified)
      return res.status(400).send({ message: "Email is not verified" });
    const matchpass = await user.comparePassword(password);
    // console.log(matchpass);
    if (!matchpass)
      return res.status(400).send({ message: "invalid credentials." });

    const accessToken = generateAccessToken({
      _id: user._id,
      email: user.email,
    });
    console.log(accessToken);

    res.cookie("accessToken", accessToken);

    return res.status(200).send({ message: "Login Successful." });
  } catch (error) {
    return res.status(500).send({ message: "internal server error." });
  }
};

const userProfile = async (req, res) => {
  //console.log(req.user);
  try {
    const userData = await authSchema
      .findOne({ _id: req.user._id })
      .select("avater email fullName");
    if (!userData) {
      return res.status(404).send({ message: "user not found" });
    }
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: "Internal server Error!" });
  }
};

const updateProfile = async (req, res) => {
  const { fullName } = req.body;
  const userId = req.user._id;
  try {
    const userData = await authSchema.findOne({ _id: userId });

    //console.log(userData);

  
    if (fullName && fullName.trim()) userData.fullName = fullName;
    if (req.file) {
      const avatarUrl = await uploadToCloudinary({
        mimetype: req.file.mimetype,
        imgBuffer: req.file.buffer,
      });
      destroyFromCloudinary(userData.avatar);
      userData.avatar = await avatarUrl.secure_url;
    }
userData.save()

    res.status(200).send({ message: "profile update Successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registration, verifyOTP, login, userProfile, updateProfile };
