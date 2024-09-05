const {
  uploadResumeRequest,
  searchResume,
  resumeGitDetails,
} = require("../../httpRequest/resume.request");
const {
  uploadResumeMiddleWare,
} = require("../../uploadMiddleware/resumeUpload.middleware");

const resumeRoutes = (router) => {
  router.post(
    "/resume",
    uploadResumeMiddleWare.single("resumeFile"),
    uploadResumeRequest
  );
  router.get("/resumeSearch", searchResume);
  router.get("/resumeGitDetails", resumeGitDetails);
};

module.exports = { resumeRoutes };
