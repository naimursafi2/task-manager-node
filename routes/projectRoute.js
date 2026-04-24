const express = require("express");
const { createProject, projectList, addTeamMemberToProject } = require("../controllers/projectController");
const router = express.Router();

router.post("/create",createProject)
router.get("/list",projectList)
router.post("/addmember",addTeamMemberToProject)

module.exports = router