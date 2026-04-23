const express = require("express");
const { createProject, projectList } = require("../controllers/projectController");
const router = express.Router();

router.post("/create",createProject)
router.get("/list",projectList)

module.exports = router