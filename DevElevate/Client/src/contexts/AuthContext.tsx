import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
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
    theme: 'light' | 'dark';
    notifications: boolean;
    language: 'en' | 'hi';
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
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'CHANGE_PASSWORD_SUCCESS' }
  | { type: 'LOAD_USERS'; payload: User[] }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'HYDRATE_AUTH'; payload: Partial<AuthState> };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  users: [],
  sessionToken: null
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, isLoading: true, error: null };
    
    case 'LOGIN_SUCCESS':
      console.log('Reducer - LOGIN_SUCCESS payload:', action.payload);
      return {
        ...state,
        user: action.payload.user,
        sessionToken: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        sessionToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        sessionToken: null,
        isAuthenticated: false,
        error: null
      };
    
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    
    case 'CHANGE_PASSWORD_SUCCESS':
      return { ...state, error: null };
    
    case 'LOAD_USERS':
      return { ...state, users: action.payload };
    
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        )
      };
    
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    case 'HYDRATE_AUTH':
      return { ...state, ...action.payload };
    
    case 'REGISTER_SUCCESS':
      console.log('Reducer - REGISTER_SUCCESS payload:', action.payload);
      return {
        ...state,
        user: action.payload.user,
        sessionToken: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string, role: 'user' | 'admin') => Promise<void>;
  register: (name: string, email: string, password: string, role: 'user' | 'admin') => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  loadUsers: () => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
} | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load auth state from localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('devElevateAuth');
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        dispatch({ type: 'HYDRATE_AUTH', payload: parsedAuth });
      } catch (error) {
        console.error('Error parsing saved auth state:', error);
      }
    }
  }, []);

  // Save auth state to localStorage
  useEffect(() => {
    localStorage.setItem('devElevateAuth', JSON.stringify(state));
  }, [state]);

  const generateToken = () => {
    return 'token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  };

  const login = async (email: string, password: string, role: 'user' | 'admin') => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage
      const savedUsers = JSON.parse(localStorage.getItem('devElevateUsers') || '[]');
      const user = savedUsers.find((u: User) => u.email === email && u.role === role);
      
      if (!user) {
        throw new Error('Invalid credentials or role');
      }
      
      // Simulate password check (in real app, this would be hashed)
      if (password !== 'password123') {
        throw new Error('Invalid password');
      }
      
      const token = generateToken();
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      console.log('Login function - updatedUser:', updatedUser);
      console.log('Login function - dispatching LOGIN_SUCCESS');
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { user: updatedUser, token } 
      });
      
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  };

  const register = async (name: string, email: string, password: string, role: 'user' | 'admin') => {
    dispatch({ type: 'REGISTER_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const savedUsers = JSON.parse(localStorage.getItem('devElevateUsers') || '[]');
      const existingUser = savedUsers.find((u: User) => u.email === email);
      
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      const newUser: User = {
        id: 'user_' + Date.now(),
        name,
        email,
        role,
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true,
        preferences: {
          theme: 'light',
          notifications: true,
          language: 'en',
          emailUpdates: true
        },
        progress: {
          coursesEnrolled: [],
          completedModules: 0,
          totalPoints: 0,
          streak: 0,
          level: 'Beginner'
        }
      };
      console.log('Register function - newUser:', newUser);
      console.log('Register function - dispatching REGISTER_SUCCESS');
      
      // Save user to localStorage
      savedUsers.push(newUser);
      localStorage.setItem('devElevateUsers', JSON.stringify(savedUsers));
      
      const token = generateToken();
      
      dispatch({ 
        type: 'REGISTER_SUCCESS', 
        payload: { user: newUser, token } 
      });
      
    } catch (error) {
      dispatch({ 
        type: 'REGISTER_FAILURE', 
        payload: error instanceof Error ? error.message : 'Registration failed' 
      });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('devElevateAuth');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!state.user) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...state.user, ...data };
      
      // Update in localStorage
      const savedUsers = JSON.parse(localStorage.getItem('devElevateUsers') || '[]');
      const userIndex = savedUsers.findIndex((u: User) => u.id === state.user!.id);
      if (userIndex !== -1) {
        savedUsers[userIndex] = updatedUser;
        localStorage.setItem('devElevateUsers', JSON.stringify(savedUsers));
      }
      
      dispatch({ type: 'UPDATE_PROFILE', payload: data });
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In real app, verify current password and update
      if (currentPassword !== 'password123') {
        throw new Error('Current password is incorrect');
      }
      
      dispatch({ type: 'CHANGE_PASSWORD_SUCCESS' });
    } catch (error) {
      throw error;
    }
  };

  const loadUsers = () => {
    const savedUsers = JSON.parse(localStorage.getItem('devElevateUsers') || '[]');
    dispatch({ type: 'LOAD_USERS', payload: savedUsers });
  };

  const updateUser = (user: User) => {
    // Update in localStorage
    const savedUsers = JSON.parse(localStorage.getItem('devElevateUsers') || '[]');
    const userIndex = savedUsers.findIndex((u: User) => u.id === user.id);
    if (userIndex !== -1) {
      savedUsers[userIndex] = user;
      localStorage.setItem('devElevateUsers', JSON.stringify(savedUsers));
    }
    
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const deleteUser = (userId: string) => {
    // Remove from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('devElevateUsers') || '[]');
    const filteredUsers = savedUsers.filter((u: User) => u.id !== userId);
    localStorage.setItem('devElevateUsers', JSON.stringify(filteredUsers));
    
    dispatch({ type: 'DELETE_USER', payload: userId });
  };

  return (
    <AuthContext.Provider value={{
      state,
      dispatch,
      login,
      register,
      logout,
      updateProfile,
      changePassword,
      loadUsers,
      updateUser,
      deleteUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};