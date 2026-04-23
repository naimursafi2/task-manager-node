const { generateSlug } = require("../helpers/utils");
const projectSchema = require("../models/projectSchema");

const createProject = async (req, res) => {
  const { title, description } = req.body;
  try {
    const slug = generateSlug(title);
    const project = await projectSchema({
      title,
      description,
      slug,
      author: req.user._id,
    });
    project.save();
    res.status(200).send({ message: "project created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

const projectList = async (req, res) => {
  try {
    const { search } = req.query;

    const project = await projectSchema.find({
      author: req.user._id,
      title: {
        $regex: search,
        $options: "i",
      },
    }).populate("author","fullName avatar");
    if (!project) return res.status(400).send({ message: "Project not found" });

    res.status(200).send({ project });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
  }
};
module.exports = { createProject, projectList };
