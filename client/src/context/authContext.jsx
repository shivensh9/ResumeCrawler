import React, { createContext, useContext, useState } from "react";

import { toast } from "react-toastify";
import userGlobalConfig from "../utils/constant/GlobalConfig";

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(
    !!localStorage.getItem(userGlobalConfig.TOKEN)
  );

  const isLoggedOut = () => {
    setisAuthenticated(false);
    localStorage.clear();
    toast.success("Logout successfully");
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setisAuthenticated,
        isLoggedOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
