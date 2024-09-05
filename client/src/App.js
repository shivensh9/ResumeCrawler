import React from "react";
import "./App.css";
import Navigation from "./routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/authContext";
import { ResumeProvider } from "./context/resumeContext";

const App = () => {
  return (
    <div className="main-theme">
      <AuthProvider>
        <ResumeProvider>
          <Navigation />
          <ToastContainer autoClose={1000} />
        </ResumeProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
