import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginScreen from "../screens/Auth/Login";
import RegisterScreen from "../screens/Auth/Register";
import { useAppContext } from "../context/authContext";
import HomeScreen from "../screens/Home";
import ResumeList from "../screens/Home/resumeList";

const Navigation = () => {
  const { isAuthenticated, isLoggedOut } = useAppContext();

  const PublicRoute = () => {
    if (isAuthenticated) {
      return <Navigate to="/home" replace />;
    }

    return <Outlet />;
  };

  const ProtectedRoute = () => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return (
      <>
        <Outlet />
        <button className="logout-btn" onClick={isLoggedOut}>
          Log out
        </button>
      </>
    );
  };
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route index element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/resumeList" element={<ResumeList />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default Navigation;
