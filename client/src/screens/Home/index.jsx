import React, { useState } from "react";
import FileUpload from "../../components/common/uploadFile";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "../../components/common/modal";
import { useResumeContext } from "../../context/resumeContext";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../utils/constant/images";

const HomeScreen = () => {
  let baseUrl = process.env.REACT_APP_BASE_URL;
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setLanguages } = useResumeContext();

  const navigate = useNavigate();

  const handleFileUpload = (selectedFiles) => {
    setFiles(Array.from(selectedFiles)); // Convert FileList to Array
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      setLanguages(value.split(","));
      navigate("/resumeList");
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    if (files.length === 0) {
      toast.error("Please upload files first.");
      setLoading(false);
      return;
    }
    const result = [];
    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append("resumeFile", file);
      return axios.post(`${baseUrl}/resume`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    });

    try {
      const arr = await Promise.all(uploadPromises);
        arr.map((item) => {
          result.push(item.data.data);
        })
      toast.success("Files uploaded successfully");
      navigate("/resumeList", {
        state: {
          data: result,
        },
      });
      setLanguages([])
      setShow(false);
      setFiles([]);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to upload the files."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-height">
      <div className="container">
        <div className="logo">
          <img src={IMAGES.mainLogo} alt="logo" />
        </div>
        <div className="search-btn-blk">
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
          <button onClick={() => {
                setLanguages(value.split(","));
                navigate("/resumeList");
              }} className="search-btn">
          <i
              
              class="fa-solid fa-magnifying-glass "
            ></i>  Search
            </button>
          <span className="divider"></span>
          <button className="upload-resume-btn" onClick={() => setShow(!show)}>
            Upload Resume
          </button>
        </div>

        <Modal
          open={show}
          closeModalFn={() => setShow(false)}
          loading={loading}
          saveFn={onSubmit}
          title={"Upload Resume"}
        >
          <FileUpload
            onUpload={handleFileUpload}
            file={files}
            setFile={setFiles}
          />
        </Modal>
      </div>
    </div>
  );
};

export default HomeScreen;
