import { baseUrl } from "../config/routes";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

// Types
export interface User {
  id: string;
  name: string;
  username?: string; // Optional for backward compatibility
  email: string;
  avatar?: string;
  role: "user" | "admin";
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  joinDate: string;
  lastLogin: string;
  isActive: boolean;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
    language: "en" | "hi";
    emailUpdates: boolean;
  };
  progress: {
    coursesEnrolled: string[];
    completedModules: number;
    totalPoints: number;
    streak: number;
    level: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  users: User[]; // For admin management
  sessionToken: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "REGISTER_START" }
  | { type: "REGISTER_SUCCESS"; payload: { user: User; token: string } }
  | { type: "REGISTER_FAILURE"; payload: string }
  | { type: "UPDATE_PROFILE"; payload: Partial<User> }
  | { type: "CHANGE_PASSWORD_SUCCESS" }
  | { type: "LOAD_USERS"; payload: User[] }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "DELETE_USER"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "HYDRATE_AUTH"; payload: Partial<AuthState> };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  users: [],
  sessionToken: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return { ...state, isLoading: true, error: null };

    case "LOGIN_SUCCESS":
      console.log("Reducer - LOGIN_SUCCESS payload:", action.payload);
      return {
        ...state,
        user: action.payload.user,
        sessionToken: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        user: null,
        sessionToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        sessionToken: null,
        isAuthenticated: false,
        error: null,
      };

    case "UPDATE_PROFILE":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    case "CHANGE_PASSWORD_SUCCESS":
      return { ...state, error: null };

    case "LOAD_USERS":
      return { ...state, users: action.payload };

    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    case "HYDRATE_AUTH":
      return { ...state, ...action.payload };

    case "REGISTER_SUCCESS":
      console.log("Reducer - REGISTER_SUCCESS payload:", action.payload);
      return {
        ...state,
        user: action.payload.user,
        sessionToken: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    default:
      return state;
  }
};
const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (
    email: string,
    password: string,
    role: "user" | "admin"
  ) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: "user" | "admin"
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  loadUsers: () => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
} | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load auth state from localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem("devElevateAuth");
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        dispatch({ type: "HYDRATE_AUTH", payload: parsedAuth });
      } catch (error) {
        console.error("Error parsing saved auth state:", error);
      }
    }
  }, []);

  // Save auth state to localStorage
  useEffect(() => {
    if (state.isAuthenticated && state.user && state.sessionToken) {
      localStorage.setItem("devElevateAuth", JSON.stringify(state));
    }
  }, [state]);

  const login = async (
    email: string,
    password: string,
    role: "user" | "admin"
  ) => {
    dispatch({ type: "LOGIN_START" });
    try {
      // Make API call to backend login endpoint
<<<<<<< HEAD
      console.log(baseUrl);
      const response = await fetch(`${baseUrl}/auth/login`, {
=======
       const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
>>>>>>> 2bce4321cb943de3c0ee55880c17a00aaf2cd102
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Backend returns real JWT token and user data
      if (data.token && data.user) {
        // Check if the role matches what the user selected
        if (data.user.role !== role) {
          throw new Error(
            `
            
            unauthozrized - expected role ${role}`
          );
        }

        const user: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.name}`,
          bio:
            data.user.role === "admin"
              ? "System Administrator"
              : "DevElevate User",
          socialLinks: {},
          joinDate: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isActive: true,
          preferences: {
            theme: "light",
            notifications: true,
            language: "en",
            emailUpdates: true,
          },
          progress: {
            coursesEnrolled: [],
            completedModules: 0,
            totalPoints: 0,
            streak: 0,
            level: "Beginner",
          },
        };

        console.log("Login successful - user:", user);
        console.log("Login successful - token:", data.token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user, token: data.token },
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      console.error("Login error:", errorMessage);
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "user" | "admin"
  ) => {
    dispatch({ type: "REGISTER_START" });

    try {
      // Make API call to backend register endpoint
      const response = await fetch(`${baseUrl}/api/v1/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // For registration, we need to login after successful signup
      // The backend doesn't return a token on signup, so we login immediately
      if (data.message === "User registered successfully") {
        // Auto-login after successful registration
<<<<<<< HEAD
        const loginResponse = await fetch(`${baseUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
=======
        const loginResponse = await fetch(
          `${baseUrl}/api/v1/auth/login`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );
>>>>>>> 2bce4321cb943de3c0ee55880c17a00aaf2cd102

        const loginData = await loginResponse.json();

        if (loginResponse.ok && loginData.token && loginData.user) {
          const user: User = {
            id: loginData.user.id,
            name: loginData.user.name,
            email: loginData.user.email,
            role: loginData.user.role,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginData.user.name}`,
            bio:
              loginData.user.role === "admin"
                ? "System Administrator"
                : "DevElevate User",
            socialLinks: {},
            joinDate: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            isActive: true,
            preferences: {
              theme: "light",
              notifications: true,
              language: "en",
              emailUpdates: true,
            },
            progress: {
              coursesEnrolled: [],
              completedModules: 0,
              totalPoints: 0,
              streak: 0,
              level: "Beginner",
            },
          };

          console.log("Registration successful - user:", user);
          console.log("Registration successful - token:", loginData.token);

          dispatch({
            type: "REGISTER_SUCCESS",
            payload: { user, token: loginData.token },
          });
        } else {
          throw new Error("Registration successful but auto-login failed");
        }
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      console.error("Registration error:", errorMessage);
      dispatch({
        type: "REGISTER_FAILURE",
        payload: errorMessage,
      });
    }
  };
<<<<<<< HEAD

=======
>>>>>>> 2bce4321cb943de3c0ee55880c17a00aaf2cd102
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("devElevateAuth");
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!state.user) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedUser = { ...state.user, ...data };

      // Update in localStorage
      const savedUsers = JSON.parse(
        localStorage.getItem("devElevateUsers") || "[]"
      );
      const userIndex = savedUsers.findIndex(
        (u: User) => u.id === state.user!.id
      );
      if (userIndex !== -1) {
        savedUsers[userIndex] = updatedUser;
        localStorage.setItem("devElevateUsers", JSON.stringify(savedUsers));
      }

      dispatch({ type: "UPDATE_PROFILE", payload: data });
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In real app, verify current password and update
      if (currentPassword !== "password123") {
        throw new Error("Current password is incorrect");
      }

      dispatch({ type: "CHANGE_PASSWORD_SUCCESS" });
    } catch (error) {
      throw error;
    }
  };

  const loadUsers = () => {
    const savedUsers = JSON.parse(
      localStorage.getItem("devElevateUsers") || "[]"
    );
    dispatch({ type: "LOAD_USERS", payload: savedUsers });
  };

  const updateUser = (user: User) => {
    // Update in localStorage
    const savedUsers = JSON.parse(
      localStorage.getItem("devElevateUsers") || "[]"
    );
    const userIndex = savedUsers.findIndex((u: User) => u.id === user.id);
    if (userIndex !== -1) {
      savedUsers[userIndex] = user;
      localStorage.setItem("devElevateUsers", JSON.stringify(savedUsers));
    }

    dispatch({ type: "UPDATE_USER", payload: user });
  };

  const deleteUser = (userId: string) => {
    // Remove from localStorage
    const savedUsers = JSON.parse(
      localStorage.getItem("devElevateUsers") || "[]"
    );
    const filteredUsers = savedUsers.filter((u: User) => u.id !== userId);
    localStorage.setItem("devElevateUsers", JSON.stringify(filteredUsers));

    dispatch({ type: "DELETE_USER", payload: userId });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        loadUsers,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
