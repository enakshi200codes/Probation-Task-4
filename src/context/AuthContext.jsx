import React, { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../config/constants";
import { useToast } from "./ToastContext";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage(STORAGE_KEYS.USERS, []);
  const [session, setSession] = useLocalStorage(STORAGE_KEYS.SESSION, null);
  const { showToast } = useToast();

  const register = useCallback((firstName, lastName, email, password) => {
    const emailLower = email.toLowerCase();
    const existingUser = users.find((u) => u.email === emailLower);

    if (existingUser) {
      showToast("An account with this email already exists.", { type: "error" });
      return false;
    }

    // Obfuscating password for mock purposes (Do not use base64 in production!)
    const mockHash = btoa(password);
    
    const newUser = {
      id: `USR-${Math.random().toString(36).substr(2, 9)}`,
      firstName,
      lastName,
      email: emailLower,
      hash: mockHash
    };

    setUsers((prev) => [...prev, newUser]);
    
    // Auto-login after registration (store session WITHOUT sensitive data)
    setSession({ id: newUser.id, firstName, lastName, email: emailLower });
    showToast("Account created successfully.", { type: "success" });
    return true;
  }, [users, setUsers, setSession, showToast]);

  const login = useCallback((email, password) => {
    const emailLower = email.toLowerCase();
    const mockHash = btoa(password);
    
    const user = users.find((u) => u.email === emailLower && u.hash === mockHash);

    if (!user) {
      showToast("Invalid email or password.", { type: "error" });
      return false;
    }

    setSession({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email });
    showToast(`Welcome back, ${user.firstName}.`, { type: "success" });
    return true;
  }, [users, setSession, showToast]);

  const logout = useCallback(() => {
    setSession(null);
    showToast("You have been securely logged out.", { type: "info" });
  }, [setSession, showToast]);

  return (
    <AuthContext.Provider value={{ user: session, isAuthenticated: !!session, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}