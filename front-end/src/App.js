import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import UserProfile from "./Component/UserProfile";
import UpdatePassword from "./Component/UpdatePassword";
import AdminDashboard from "./Component/CandidatesUi/AdminDashboard";
import VoterDashboard from "./Component/CandidatesUi/VoterDashboard";
import { RoleContext } from "./Component/CandidatesUi/RoleContext";
import ProtectedRoute from "./Component/ProtectedRoute";
import Unauthorized from "./Component/Unauthorized"; // Dedicated Unauthorized component
import Singup from "./Component/Singup";
import LandingPage from "./Component/Landingpage";

const App = () => {
  const { role, isAuthenticated } = useContext(RoleContext);

  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage/>}/>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Singup />} />
        <Route path="/profile/password" element={
          <ProtectedRoute  
          component={UpdatePassword}
          isAuthenticated={isAuthenticated}
          role={role}
          requiredRole='voter'
          />
        }/>
        {/* Protected Routes */}
        <Route
          path="/voter"
          element={
            <ProtectedRoute
              component={VoterDashboard}
              isAuthenticated={isAuthenticated}
              role={role}
              requiredRole="voter"
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              component={AdminDashboard}
              isAuthenticated={isAuthenticated}
              role={role}
              requiredRole="admin"
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              component={UserProfile}
              isAuthenticated={isAuthenticated}
              role={role}
            />
          }
        />

        {/* Unauthorized Access Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
};

export default App;
