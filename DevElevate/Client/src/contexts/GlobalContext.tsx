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
  email: string;
  avatar?: string;
  joinDate: string;
  streak: number;
  totalPoints: number;
  level: string;
}

export interface LearningProgress {
  [topic: string]: {
    completed: number;
    total: number;
    modules: {
      [moduleId: string]: {
        completed: boolean;
        progress: number;
        lastAccessed: string;
      };
    };
  };
}

export interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
  category?: "learning" | "career" | "general";
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishDate: string;
  category: "tech" | "jobs" | "internships" | "events";
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  points: number;
  category: string;
}

export interface Resume {
  id: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    duration: string;
    gpa?: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
}

// Add Notification type and notifications to GlobalState
export interface Notification {
  id: string;
  message: string;
  read: boolean;
  date: string;
  type?: string;
}

export interface GlobalState {
  user: User | null;
  learningProgress: LearningProgress;
  chatHistory: ChatMessage[];
  bookmarks: string[];
  assignments: Assignment[];
  newsItems: NewsItem[];
  resume: Resume | null;
  darkMode: boolean;
  currentModule: string;
  dailyGoals: string[];
  completedGoals: string[];
  streakData: { [date: string]: boolean };
  notifications: Notification[]; // <-- Added notifications property
}

// Actions
type GlobalAction =
  | { type: "SET_USER"; payload: User }
  | {
      type: "UPDATE_LEARNING_PROGRESS";
      payload: { topic: string; moduleId: string; progress: number };
    }
  | { type: "ADD_CHAT_MESSAGE"; payload: ChatMessage }
  | { type: "ADD_BOOKMARK"; payload: string }
  | { type: "REMOVE_BOOKMARK"; payload: string }
  | { type: "ADD_ASSIGNMENT"; payload: Assignment }
  | { type: "COMPLETE_ASSIGNMENT"; payload: string }
  | { type: "UPDATE_NEWS"; payload: NewsItem[] }
  | { type: "UPDATE_RESUME"; payload: Resume }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "SET_CURRENT_MODULE"; payload: string }
  | { type: "ADD_DAILY_GOAL"; payload: string }
  | { type: "COMPLETE_DAILY_GOAL"; payload: string }
  | { type: "UPDATE_STREAK"; payload: { date: string; completed: boolean } }
  | { type: "HYDRATE_STATE"; payload: Partial<GlobalState> }
  | { type: "UNDO_DAILY_GOAL"; payload: string }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "MARK_ALL_NOTIFICATIONS_READ" }
  | { type: "SET_NOTIFICATIONS"; payload: Notification[] }

// Initial state
const initialState: GlobalState = {
  user: null,
  learningProgress: {},
  chatHistory: [],
  bookmarks: [],
  assignments: [],
  newsItems: [],
  resume: null,
  darkMode: false,
  currentModule: "dashboard",
  dailyGoals: [],
  completedGoals: [],
  streakData: {},
  notifications: [], // <-- Initialize notifications as empty array
};

// Reducer
const globalReducer = (
  state: GlobalState,
  action: GlobalAction
): GlobalState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "UPDATE_LEARNING_PROGRESS":
      const { topic, moduleId, progress } = action.payload;
      return {
        ...state,
        learningProgress: {
          ...state.learningProgress,
          [topic]: {
            ...state.learningProgress[topic],
            modules: {
              ...state.learningProgress[topic]?.modules,
              [moduleId]: {
                completed: progress >= 100,
                progress,
                lastAccessed: new Date().toISOString(),
              },
            },
          },
        },
      };

    case "ADD_CHAT_MESSAGE":
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload],
      };

    case "ADD_BOOKMARK":
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
      };

    case "REMOVE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.filter((id) => id !== action.payload),
      };

    case "ADD_ASSIGNMENT":
      return {
        ...state,
        assignments: [...state.assignments, action.payload],
      };

    case "COMPLETE_ASSIGNMENT":
      return {
        ...state,
        assignments: state.assignments.map((assignment) =>
          assignment.id === action.payload
            ? { ...assignment, completed: true }
            : assignment
        ),
      };

    case "UPDATE_NEWS":
      return {
        ...state,
        newsItems: action.payload,
      };

    case "UPDATE_RESUME":
      return {
        ...state,
        resume: action.payload,
      };

    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case "SET_CURRENT_MODULE":
      return {
        ...state,
        currentModule: action.payload,
      };

    case "ADD_DAILY_GOAL":
      return {
        ...state,
        dailyGoals: [...state.dailyGoals, action.payload],
      };

    case "COMPLETE_DAILY_GOAL":
      return {
        ...state,
        completedGoals: [...state.completedGoals, action.payload],
        dailyGoals: state.dailyGoals.filter((goal) => goal !== action.payload),
      };

    case "UNDO_DAILY_GOAL":
      return {
        ...state,
        completedGoals: state.completedGoals.filter(
          (goal) => goal !== action.payload
        ),
        dailyGoals: [...state.dailyGoals, action.payload],
      };

    case "UPDATE_STREAK":
      return {
        ...state,
        streakData: {
          ...state.streakData,
          [action.payload.date]: action.payload.completed,
        },
      };

    case "HYDRATE_STATE":
      return {
        ...state,
        ...action.payload,
      };

    // --- Notification actions ---
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };

    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };

    case "MARK_ALL_NOTIFICATIONS_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      };

    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
      };

    default:
      return state;
  }
};

// Context
const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
} | null>(null);

// Provider
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  // Persist state to localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("devElevateState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: "HYDRATE_STATE", payload: parsedState });
      } catch (error) {
        console.error("Error parsing saved state:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("devElevateState", JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook
export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};
