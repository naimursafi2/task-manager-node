const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "@gmail.com",
    pass: "",
  },
});

const mailsender = async ({ email, subject, otp }) => {
  try {
    await transporter.sendMail({
      from: '"TaskManager Team" <team@taskmanager.com>',
      to: email,
      subject: subject,
      html: `<b>Plz verify your email.</b>
          <b> OTP:${otp} </b>`,
    });
  } catch (error) {
    console.log("Error while sending mail", error);
  }
};
module.exports = { mailsender };
