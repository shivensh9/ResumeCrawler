const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    resumeFile: {
      type: String, // assuming you'll store the file path or URL
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    emailId: {
      type: String,
    },
    linkedInLink: {
      type: String,
    },
    gitHubLink: {
      type: String,
    },
    stackOverFlowLink: {
      type: String,
    },
    gitHubUserName: {
      type: String,
    },
    uniqueLanguages: {
      type: [String], // array of strings
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
