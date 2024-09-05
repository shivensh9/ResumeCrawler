/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const ResumeDetail = ({ gitHubUserName }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/resumeGitDetails`,
        {
          params: {
            gitHubUserName: gitHubUserName,
          },
        }
      );
      if (response?.status === 200) {
        setProjects(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loading">
          <ClipLoader size={50} color="#000" />
        </div>
      ) : (
        <div className="scroll-blk">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-2 g-3 mt-2 ">
            {projects?.data?.project?.map((items, index) => (
              <div key={index} className="col">
                <div className="project-main-wrapper">
                  <div className="wrapper-inner">
                    <div>
                      <p>{items?.projectName}</p>
                      <a
                        className="cursor-pointer"
                        onClick={() => window.open(items?.repoLink)}
                      >
                        {items?.repoLink}
                      </a>
                    </div>
                    <div className="badge-blk">
                      {items?.languages?.map((lng, i) => {
                        const languageName = Object.keys(lng)[0];
                        const percentage = lng[languageName];
                        return (
                          <label
                            style={{
                              background:
                                "#50" +
                                Math.floor(Math.random() * 16777215)
                                  .toString(16)
                                  .padStart(6, "0"),
                            }}
                            key={i}
                          >
                            {languageName}
                            {percentage}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeDetail;
