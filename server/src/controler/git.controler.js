const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.GITHUB_TOKEN;
// Function to get user details including email
async function fetchUserDetails(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch user details: ${
        error.response ? error.response.statusText : error.message
      }`
    );
  }
}

// Function to get all repositories for a user
async function fetchUserRepos(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch repos: ${
        error.response ? error.response.statusText : error.message
      }`
    );
  }
}

// Function to get language statistics for a repository
async function fetchRepoLanguages(repoFullName) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repoFullName}/languages`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch languages: ${
        error.response ? error.response.statusText : error.message
      }`
    );
  }
}

// Function to calculate language percentages
function calculateLanguagePercentages(languages) {
  const totalBytes = Object.values(languages).reduce(
    (acc, value) => acc + value,
    0
  );
  return Object.keys(languages).map((lang) => ({
    [lang]: `${Math.round((languages[lang] / totalBytes) * 100)}%`,
  }));
}

// Main function to fetch user details and repo data, then construct JSON
async function getUserRepoData(username) {
  try {
    // Fetch user details including email
    const userDetails = await fetchUserDetails(username);
    const userEmail = userDetails.email || "No public email available";
    // Fetch all repositories for the user
    const repos = await fetchUserRepos(username);
    const projectPromises = repos.map(async (repo) => {
      const languages = await fetchRepoLanguages(`${username}/${repo.name}`);
      return {
        projectName: repo.name,
        repoLink: repo.html_url,
        updatedAt: repo.updated_at,
        originalName: repo.full_name, // Original name of the repo
        languages: calculateLanguagePercentages(languages),
      };
    });

    const projects = await Promise.all(projectPromises);

    return {
      owner: username,
      email: userEmail,
      project: projects,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = { getUserRepoData };
