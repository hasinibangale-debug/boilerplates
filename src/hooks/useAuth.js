import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * useAuth Hook
 * 
 * Custom hook to access authentication context.
 * Must be used within a component that is wrapped by AuthProvider.
 * 
 * Returns:
 * - user: Current authenticated user object (or null)
 * - token: JWT token for API requests
 * - isAuthenticated: Boolean flag indicating if user is logged in
 * - loading: Boolean flag for loading state
 * - login(credentials): Function to authenticate user
 * - logout(): Function to clear authentication
 * 
 * Usage Example:
 * function MyComponent() {
 *   const { user, isAuthenticated, login, logout } = useAuth();
 *   
 *   if (loading) return <Loader />;
 *   
 *   return (
 *     <div>
 *       {isAuthenticated ? (
 *         <div>Welcome, {user.name}</div>
 *       ) : (
 *         <button onClick={() => login({ email, password })}>Login</button>
 *       )}
 *     </div>
 *   );
 * }
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}