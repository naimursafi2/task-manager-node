const projectSchema = require("../models/projectSchema");

const createProject = async (req, res) => {
  const { title, description } = req.body;
  try {
    const project = await projectSchema({
      title,
      description,
      author: req.user._id,
    });
    project.save();
    res.status(200).send({ message: "project created successfully" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createProject };
