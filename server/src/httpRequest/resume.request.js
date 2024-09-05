// Importing required controllers
const { getUserRepoData } = require("../controler/git.controler");
const { uploadResume } = require("../controler/resumeUpload.controler");
const { searchResumes } = require("../controler/resumeSearch.controler");
const {
  extractResumeContent,
  extractUserNameFromGitHub,
} = require("../controler/resumeReadFile.controler");


let resumes = [];

// Function to handle the resume upload request
const uploadResumeRequest = async (req, res) => {
  try {
    // Extract content from the uploaded resume file
    extractResumeContent(req?.file?.filename)
      .then(async (data) => {
        // Extract email and social media links from the resume content
        const links = data.pages[0].links;
        const emailId = links
          .find((link) => link.startsWith("mailto:"))
          .replace("mailto:", "");
        const githubLink = links.find((link) => link.includes("github.com"));
        const linkedinLink = links.find((link) =>
          link.includes("linkedin.com")
        );

        // Extract GitHub username from the GitHub link
        const githubUserName = extractUserNameFromGitHub(githubLink);

        // Fetch GitHub repository data for the extracted username
        getUserRepoData(githubUserName)
          .then(async (repoResponse) => {
            // Extract unique programming languages used across all projects
            const uniqueLanguages = [
              ...new Set(
                repoResponse?.project?.flatMap((project) =>
                  project.languages.map((lang) => Object.keys(lang)[0])
                )
              ),
            ];

            // Prepare the payload for uploading the resume
            const uploadPayload = {
              resumeFile: req?.file?.filename,
              phoneNumber: "",
              emailId: emailId,
              linkedInLink: linkedinLink,
              gitHubLink: githubLink,
              stackOverFlowLink: "",
              gitHubUserName: githubUserName,
              uniqueLanguages: uniqueLanguages,
            };

            // Upload the resume with the extracted and fetched data
            const result = await uploadResume(uploadPayload);
            if (result.success) {
              // Send a success response if the upload is successful
              res.status(200).json({
                message: "Resume uploaded successfully",
                data: result.data,
              });
            } else {
              // Send an error response if there was an issue during upload
              res.status(400).json({
                message: "Failed to upload resume",
                error: result.error,
              });
            }
          })
          .catch((error) => {
            // Handle errors related to fetching GitHub repository data
            res.status(400).json({
              message: "Failed to upload resume",
              error: error.message,
            });
          });
      })
      .catch((err) => {
        // Handle errors related to extracting content from the resume
        console.error("Error extracting PDF:", err);
        res.status(500).json({
          message: "Error extracting resume content",
          error: err.message,
        });
      });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// const uploadResumeRequest = async (req, res) => {
//   try {
//     // Ensure files were uploaded
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         message: "No files were uploaded.",
//       });
//     }

//     const resumePromises = req.files.map(async (file) => {
//       const fileName = file.filename; // Get the uploaded filename

//       // Extract content from the uploaded resume file
//       const data = await extractResumeContent(fileName);
//       const links = data.pages[0].links;

//       // Extract email and social media links from the resume content
//       const emailId = links.find((link) => link.startsWith("mailto:"))?.replace("mailto:", "") || "";
//       const githubLink = links.find((link) => link.includes("github.com")) || "";
//       const linkedinLink = links.find((link) => link.includes("linkedin.com")) || "";

//       // Extract GitHub username from the GitHub link
//       const githubUserName = extractUserNameFromGitHub(githubLink);

//       // Fetch GitHub repository data for the extracted username
//       const repoResponse = await getUserRepoData(githubUserName);

//       // Extract unique programming languages used across all projects
//       const uniqueLanguages = [
//         ...new Set(
//           repoResponse?.project?.flatMap((project) =>
//             project.languages.map((lang) => Object.keys(lang)[0])
//           )
//         ),
//       ];

//       // Prepare the payload for uploading the resume
//       return {
//         resumeFile: fileName,
//         phoneNumber: "", // You can adjust to get this from req.body if needed
//         emailId: emailId,
//         linkedInLink: linkedinLink,
//         gitHubLink: githubLink,
//         stackOverFlowLink: "",
//         gitHubUserName: githubUserName,
//         uniqueLanguages: uniqueLanguages,
//       };
//     });

//     const resumesData = await Promise.all(resumePromises); // Wait for all resumes to be processed

//     // Save all resumes data in your database or in-memory store
//     for (const resumePayload of resumesData) {
//       const result = await uploadResume(resumePayload);
//       if (!result.success) {
//         return res.status(400).json({
//           message: "Failed to upload one or more resumes.",
//           error: result.error,
//         });
//       }
//     }

//     // Send a success response if all uploads are successful
//     res.status(200).json({
//       message: "All resumes uploaded successfully",
//       data: resumesData,
//     });
//   } catch (error) {
//     // Handle any unexpected errors
//     res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };


const searchResume = async (req, res) => {
  try {
    const { emailId, gitHubUserName, languages } = req.query;

    const response = await searchResumes(emailId, gitHubUserName, languages);
    if (response) {
      res.status(200).json({
        data: response,
      });
      return;
    }
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
    return;
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const resumeGitDetails = async (req, res) => {
  try {
    const { gitHubUserName } = req.query;

    const response = await getUserRepoData(gitHubUserName);

    if (response) {
      res.status(200).json({
        data: response,
      });
      return;
    }
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
    return;
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Export the uploadResumeRequest function
module.exports = { uploadResumeRequest, searchResume, resumeGitDetails };
