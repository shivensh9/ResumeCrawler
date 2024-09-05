const Resume = require('../models/resume.model');

// Controller function to search for resumes with OR condition
const searchResumes = async (emailId, gitHubUserName, languages) => {
    try {
        // Create an array for $or conditions
        let orConditions = [];

        // Add conditions to the $or array
        if (emailId) {
            orConditions.push({ emailId: emailId });
        }

        if (gitHubUserName) {
            orConditions.push({ gitHubUserName: gitHubUserName });
        }

        if (languages) {
            const languagesArray = languages.split(',').map(lang => lang.trim());

            // Construct a regex array for partial matches (case-insensitive)
            const regexConditions = languagesArray.map(lang => ({
                uniqueLanguages: { $regex: lang, $options: 'i' } // Case-insensitive match
            }));

            orConditions.push({ $or: regexConditions });
        }

        // Only use $or if there are conditions to apply
        let query = {};
        if (orConditions.length > 0) {
            query.$or = orConditions;
        }
        // Execute the query and return the result
        const resumes = await Resume.find(query);
        return resumes;
    } catch (error) {
       return null
    }
};


module.exports = {
    searchResumes,
};
