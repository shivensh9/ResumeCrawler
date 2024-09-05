const Resume = require("../models/resume.model");

async function uploadResume(payloadValues) {
  try {
    // Validate the required fields
    if (!payloadValues.resumeFile) {
      throw new Error("Resume file is required");
    }

    // Create a new Resume document with the payload values
    const newResume = new Resume({
      resumeFile: payloadValues.resumeFile,
      phoneNumber: payloadValues.phoneNumber,
      emailId: payloadValues.emailId,
      linkedInLink: payloadValues.linkedInLink,
      gitHubLink: payloadValues.gitHubLink,
      stackOverFlowLink: payloadValues.stackOverFlowLink,
      gitHubUserName: payloadValues.gitHubUserName,
      uniqueLanguages: payloadValues.uniqueLanguages,
    });

    console.log(payloadValues);

    // Save the document to MongoDB
    const savedResume = await newResume.save();

    // Return success response
    return { success: true, data: savedResume };
  } catch (error) {
    // Handle any errors and return failure response
    return { success: false, error: error.message };
  }
}

module.exports = { uploadResume };
