import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const RoleContext = createContext();

const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded Token in RoleProvider:", decoded);
      setRole(decoded.role);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error decoding token:", error);
      setRole(null);
      setIsAuthenticated(false);
    }
  };

  // Watch for token changes in localStorage
  useEffect(() => {
    const handleTokenChange = () => {
      const token = localStorage.getItem("token");
      if (token) {
        decodeToken(token);
      } else {
        setRole(null);
        setIsAuthenticated(false);
      }
    };

    // Listen for custom "tokenChanged" event
    window.addEventListener("tokenChanged", handleTokenChange);

    // Initial token check
    handleTokenChange();

    return () => {
      window.removeEventListener("tokenChanged", handleTokenChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setRole(null);
    setIsAuthenticated(false);

    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("tokenChanged"));
  };

  return (
    <RoleContext.Provider value={{ role, isAuthenticated, logout }}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleProvider;
