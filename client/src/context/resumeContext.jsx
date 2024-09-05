import React, { createContext, useState, useContext } from "react";

const ResumeContext = createContext();

export const useResumeContext = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const [languages, setLanguages] = useState([]);

  return (
    <ResumeContext.Provider value={{ languages, setLanguages }}>
      {children}
    </ResumeContext.Provider>
  );
};
