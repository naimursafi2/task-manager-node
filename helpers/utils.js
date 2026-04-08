const crypto = require("crypto");
const jwt = require('jsonwebtoken');

function isvalidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

const generateOTP = () => {
  // Generates a secure random integer between 1000 and 9999
  return crypto.randomInt(1000, 10000).toString();
};

const generateAccessToken = (user)=>{
  const token = jwt.sign(user, process.env.JWT_SEC);
  return token;
}

module.exports = { isvalidEmail, isValidPassword, generateOTP ,generateAccessToken};
