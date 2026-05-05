const { generateSlug } = require("../helpers/utils");
const authSchema = require("../models/authSchema");
const projectSchema = require("../models/projectSchema");

const createProject = async (req, res) => {
  const { title, description } = req.body;
  try {
    const slug = generateSlug(title);
    const project = new projectSchema({
      title,
      description,
      slug,
      author: req.user._id,
    });
    await project.save();
    res.status(200).send({ message: "project created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

const projectList = async (req, res) => {
  try {
    const { search } = req.query;

    const project = await projectSchema
      .find({
       $or:[
         {author: req.user._id},
         {members: req.user._id}
        ],
        title: {
          $regex: search || "",
          $options: "i",
        },
      })
      .populate("author members", "fullName avatar").select("title description tasks._id");
    if (!project) return res.status(400).send({ message: "Project not found" });

    res.status(200).send({ project });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

const addTeamMemberToProject = async (req, res) => {
  const { email, projectId } = req.body;
  try {
    const existEmail = await authSchema.findOne({ email });
    if (!existEmail) return res.status(400).send({ message: "Email is not exist" });

    const existMember = await projectSchema.findOne({
      _id:projectId,
       $or:[
         {author: existEmail._id},
         {members: existEmail._id}
        ]
      });
    if (existMember)return res.status(400).send({ message: "This member already exist" });
    const project = await projectSchema.findOneAndUpdate(
      { _id: projectId },
      { members: existEmail._id },
      { new: true },
    );
    if (!project) return res.status(400).send({ message: "Invalid Request" });

    res.status(200).send({message: "tem member added successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server Error" });
  }
};

const addTaskToProject = async (req, res)=>{
  const {title, description, priority, assignedTo, projectId } = req.body;
  try {
    if(!title) return res.status(400).send({message:"Task title is required"});
    if(!description) return res.status(400).send({message:"Task description is required"});
    if(!priority) return res.status(400).send({message:"Task priority is required"});
    if(!["mid", "low", "high"].includes(priority)) 
      return res.status(400).send({message:"Invalid priority value"})
    if(!projectId) return res.status(400).send({message:"Project Id not found"});
    
    if(assignedTo && !Array.isArray(assignedTo))
      return res.status(400).send({message:"Invalid assigned data"});

    if(assignedTo){    
      for (const userId of assignedTo) {       
        const existMember = await projectSchema.findOne({
          _id: projectId,
          $or:[
            {author: userId},
            {members: userId}
           ]
         });
         if(!existMember) return res.status(400).send({message: "Invalid User"})
      }
    }

    const projectData = await projectSchema.findOneAndUpdate(
      {_id:projectId},
      {tasks: {title, description, priority, assignedTo, projectId}},
      {returnDocument: 'after'}
    );
    if(!projectData) return res.status(400).send({message:"Project Id not found"});
    res.status(200).send({message:"project created successfully..",projectData})
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createProject, projectList, addTeamMemberToProject, addTaskToProject };
