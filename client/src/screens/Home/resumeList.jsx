import React, { useEffect, useState } from "react";
import axios from "axios";
import { useResumeContext } from "../../context/resumeContext";
import { formatDate } from "../../utils/helpers";
import Modal from "../../components/common/modal";
import ResumeDetail from "../../components/pages/ResumeDetail";
import { useLocation, useNavigate } from "react-router-dom";

const ResumeList = () => {
  let location = useLocation();
  const filesArray = location?.state?.data;
  let nav = useNavigate();
  const { languages, setLanguages } = useResumeContext();
  const [resumes, setResumes] = useState([]);
  const [value, setValue] = useState("");
  const [gitHubUserName, setGitHubUserName] = useState("");
  const [resumeDetailModel, setResumeDetailModel] = useState(false);
  let baseUrl = "http://localhost:3030/resumes/";

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      setLanguages(value.split(","));
    }
  };

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/resumeSearch`,
          {
            params: {
              languages: languages.join(","),
              emailId: "null",
              gitHubUserName: "null",
            },
          }
        );
        setResumes(response.data);
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
      }
    };

    if (languages.length > 0) {
      fetchResumes();
    }
  }, [languages]);

  const opneLink = (link) => window.open(link);

  const handleOpenModal = (name) => {
    setResumeDetailModel(true);
    setGitHubUserName(name);
  };

  const handleResumeCardClick = (resumeFile) => {
    window.open(`${baseUrl}${resumeFile}`);
  };

  function renderNotFound() {
    if (resumes?.data?.length === 0)
      return (
        <div
          style={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 className="text-center">No resume found!</h2>
        </div>
      );
  }
  return (
    <div className="container p-5 ">
      <button onClick={() => nav("/home")} className="back-btn">
        Back to dashboard
      </button>
      <div className="search-btn-blk mb-5">
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            position: "relative",
          }}
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search resume by textile"
            className="form-input "
            onKeyPress={handleKeyPress}
          />
        </div>
        <button
          onClick={() => {
            setLanguages(value.split(","));
          }}
          className="search-btn"
        >
          <i class="fa-solid fa-magnifying-glass "></i> Search
        </button>
      </div>
      <div className="row">
        <div className="col-12 mb-5">
          {filesArray?.length > 0 && (
            <div className="col-12">
              <h2>Recently Added Resume:</h2>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-2 g-3 mt-2">
                {filesArray?.map((resume, index) => (
                  <div key={index} className="col position-relative">
                    <div className="btn-blk">
                      <button
                        onClick={() =>
                          handleResumeCardClick(resume?.resumeFile)
                        }
                      >
                        View Resume
                      </button>
                      <button
                        onClick={() => handleOpenModal(resume?.gitHubUserName)}
                      >
                        Project Detail
                      </button>
                    </div>
                    <div className="resume-card">
                      <span>{resume?.emailId}</span>
                      <p onClick={() => opneLink(resume?.linkedInLink)}>
                        {resume?.linkedInLink}
                      </p>
                      <p onClick={() => opneLink(resume?.gitHubLink)}>
                        {resume?.gitHubLink}
                      </p>
                      <span>{formatDate(resume?.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {resumes?.data?.length > 0 && (
        <>
          <h2>Resumes Archive:</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-2 g-3 mt-2">
            {resumes?.data?.map((resume, index) => (
              <div key={index} className="col position-relative">
                <div className="btn-blk">
                  <button
                    onClick={() => handleResumeCardClick(resume?.resumeFile)}
                  >
                    View Resume
                  </button>
                  <button
                    onClick={() => handleOpenModal(resume?.gitHubUserName)}
                  >
                    Project Detail
                  </button>
                </div>
                <div className="resume-card">
                  <span>{resume?.emailId}</span>
                  <p onClick={() => opneLink(resume?.linkedInLink)}>
                    {resume?.linkedInLink}
                  </p>
                  <p onClick={() => opneLink(resume?.gitHubLink)}>
                    {resume?.gitHubLink}
                  </p>
                  <span>{formatDate(resume?.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {renderNotFound()}
      <Modal
        open={resumeDetailModel}
        closeModalFn={() => setResumeDetailModel(false)}
        loading={false}
        saveFn={() => alert("on progress")}
        title={"Projects Detail"}
        saveFnRequired={false}
      >
        <ResumeDetail gitHubUserName={gitHubUserName} />
      </Modal>
    </div>
  );
};

export default ResumeList;
