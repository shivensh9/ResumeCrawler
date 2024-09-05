/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import IMAGES from "../../utils/constant/images";

const FileUpload = ({ onUpload, file, setFile }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles;
      if (file) {
        onUpload(file);
        setFile(file);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  const removeFile = (fileToRemove) => {
    setFile((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  return (
    <div>
      <div
        className={"d-flex align-items-center flex-column border-style p-2"}
        {...getRootProps()}
      >
        <img src={IMAGES.uploadIcon} width={40} alt="upload" />
        <div className="row justify-content-center">
          <div className="d-flex w-100 ">
            <div className="dropzone text-center">
              <input {...getInputProps()} multiple />
              <p className="mb-0 text-center">
                <span style={{ fontSize: "16px" }}>
                  Drag & Drop or click here to upload file
                </span>
                <br /> or <br />
                <span
                  style={{
                    color: "rgb(119 179 171)",
                    fontWeight: "bold",
                  }}
                >
                  Browse File
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {file &&
        file.length > 0 &&
        file.map((item) => {
          return (
            <div className="image-previews">
              <div className="inner">
                <img
                  onClick={() => removeFile(item)}
                  width={13}
                  style={{ position: "absolute", right: "-15px", top: "-6px" }}
                  src={IMAGES.deleteIcon}
                  alt="cross"
                />
                {item && <label>{item.name}</label>}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default FileUpload;
