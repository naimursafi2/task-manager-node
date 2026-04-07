const nodemailer = require("nodemailer");
const { OTPMailTemp } = require("./emailTemplates");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
   auth: {
    user: "naimursafi4@gmail.com",
    pass: "vuij sdeo jeik wahr",
  },
});

const mailsender = async ({ email, subject, otp, fullName }) => {
  try {
    await transporter.sendMail({
      from: '"TaskManager Team" <team@taskmanager.com>',

      to: email,
      subject: subject,
      html: OTPMailTemp(otp, fullName),
    });
  } catch (error) {
    console.log("Error while sending mail", error);
  }
};
module.exports = { mailsender };
