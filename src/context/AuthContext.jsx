import { createContext, useState, useEffect } from "react";
import api from "../services/api";

/**
 * AuthContext - Manages authentication state and operations
 * 
 * Available in context:
 * - user: Current authenticated user object (or null)
 * - token: JWT token for API requests
 * - isAuthenticated: Boolean flag indicating if user is logged in
 * - loading: Boolean flag for loading state
 * - login(credentials): Function to authenticate user
 * - logout(): Function to clear authentication
 * 
 * Usage Example:
 * const { user, login, logout, isAuthenticated } = useContext(AuthContext);
 * 
 * Update the API endpoints below to match your backend:
 * - POST /auth/login - Should return { token, user }
 * - GET /auth/me - Should return current user object
 */
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Auto-login check on app mount if token exists
  useEffect(() => {
     const initAuth = async () => {
  if (import.meta.env.VITE_MOCK_AUTH === "true") {
    setUser({
      id: "mock-user-1",
      name: "Hasini",
      email: "hasini@example.com",
    });

    setToken("mock-token");
    setLoading(false);
    return;
  }

  if (token) {
    try {
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

  },[token]);

  // Login handler
  const login = async (credentials) => {
    // Update this endpoint to match your backend
    // Expected response: { token: "jwt_token", user: { id, email, name, ... } }
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