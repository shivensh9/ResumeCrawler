import React from "react";
import IMAGES from "../../../utils/constant/images";

const AuthWrapper = ({ children }) => {
  return (
    <section className=" py-3 py-md-5 py-xl-8 vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-12 col-md-6 col-xl-7">
            <div className="d-flex justify-content-center">
              <div className="col-12 col-xl-9">
                <img
                  className="img-fluid rounded mb-2"
                  loading="lazy"
                  src={IMAGES.mainLogo}
                  width={80}
                  height={80}
                  alt="cs Logo"
                />
                <hr className="border-primary-subtle mb-4" />
                <h2 className="h1 mb-4">
                  We make digital products that drive you to stand out.
                </h2>
                <p className="lead mb-5">
                  We write words, take photos, make videos, and interact with
                  artificial intelligence.
                </p>
                <div className="text-endx">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={48}
                    height={48}
                    fill="currentColor"
                    className="bi bi-grip-horizontal"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthWrapper;
