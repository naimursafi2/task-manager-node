const { mailsender } = require("../helpers/mailService");
const {
  isvalidEmail,
  isValidPassword,
  generateOTP,
} = require("../helpers/utils");
const authSchema = require("../models/authSchema");

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

await mailsender({email, subject: "OTP verification mail", otp:OTP_Num})

    res
      .status(200)
      .send({ message: "Registration Successful Pleaze verify your email" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { registration };
