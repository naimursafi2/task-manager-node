const { isvalidEmail, isValidPassword } = require("../helpers/utils");
const authSchema = require("../models/authSchema");

const registration =async (req, res)=>{
    const{fullName, email, password} = req.body;
try {
   if(!fullName.trim()) return res.status(404).send({message: "FullName is required."});
   if(!email) return res.status(404).send({message: "email is required."});
   if(!isvalidEmail(email)) return res.status(404).send({message: "email is invalid."});
   if(!password) return res.status(404).send({message: "password is required."});
   if(!isValidPassword) return res.status(404).send({message: "password is invalid."});
           
   //check if email already exist
     const existingEmail = await authSchema.findOne({email});
     if(existingEmail) return res.status(404).send({message: "This email already registerd."});

     const user = await authSchema({fullName, email, password})
   user.save()
    res.status(200).send({message: "Registration Successful Pleaze verify your email"})

} 
catch (error) {
    res.status(500).send({message: "Internal Server Error"});
}
}

module.exports = { registration}