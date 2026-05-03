const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    console.log("cookies:", req.cookies);
    const decoded = jwt.verify(accessToken, process.env.JWT_SEC);
    if (decoded) {

        req.user = decoded;
      next();
    } else {
      res.status(401).send({ message: "unauthorized request" });
    }
  } catch (error) {    
    res.status(401).send({ message: "unauthorized request" });
  }
};

module.exports = { authmiddleware };
