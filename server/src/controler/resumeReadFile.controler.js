const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const fs = require('fs');

const extractResumeContent = file => {
  return new Promise((resolve, reject) => {
    const buffer = fs.readFileSync(`./resumes/${file}`);
    const options = {}; // You can configure your options here

    pdfExtract.extractBuffer(buffer, options, (err, data) => {
      if (err) {
        return reject(err); // Reject the promise if there's an error
      }
      resolve(data); // Resolve the promise with the extracted data
    });
  });
};

const extractUserNameFromGitHub=(githubUrl)=>{
    // Use a regular expression to extract the username from the GitHub URL
    const match = githubUrl.match(/github\.com\/([^\/]+)/);
    return match ? match[1] : null;
  
}

module.exports = { extractResumeContent,extractUserNameFromGitHub };
