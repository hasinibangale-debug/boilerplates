import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Auto-login check on app mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // Fetch current user details from backend using token
          const response = await api.get("/auth/me");
          setUser(response.data);
        } catch (error) {
          console.error("Session expired or invalid token:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  // Login handler
  const login = async (credentials) => {
    // Replace with your actual backend endpoint (e.g., /auth/login)
    const response = await api.post("/auth/login", credentials);
    const { token: authToken, user: userData } = response.data;

    localStorage.setItem("token", authToken);
    setToken(authToken);
    setUser(userData);
    return response.data;
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}