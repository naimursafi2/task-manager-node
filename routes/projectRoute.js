const express = require("express");
const { createProject, projectList, addTeamMemberToProject, addTaskToProject } = require("../controllers/projectController");
const router = express.Router();

router.post("/create",createProject)
router.get("/list",projectList)
router.post("/addmember",addTeamMemberToProject)
router.post("/addtask",addTaskToProject)

module.exports = router