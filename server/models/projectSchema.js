const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  priority: {
    type: String,
    default: "mid",
    enum: ["mid", "low", "high"],
  },
  assignedTo: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  isComplete: {
    type: Boolean,
    default: false,
  },
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  members: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  tasks: [taskSchema],
});

module.exports = mongoose.model("projects", projectSchema);
