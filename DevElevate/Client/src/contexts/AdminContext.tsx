import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getAllUsers, addUser } from "../api/adminApi";
import { User } from "../types/User";

// Define the structure of user input for creation
interface NewUserInput {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface AdminContextType {
  users: User[];
  totalUsers: number;
  totalAdmins: number;
  loading: boolean;
  fetchAllUsers: () => void;
  addUserByAdmin: (userData: NewUserInput) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data.users);
      setTotalUsers(data.totalUsers);
      setTotalAdmins(data.totalAdmins);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const addUserByAdmin = async (userData: NewUserInput) => {
    try {
      const data = await addUser(userData);

      // Basic validation of response
      if (!data || !data.user || !data.user.name || !data.user.email) {
        console.error("❌ Incomplete user data received:", data);
        throw new Error("Incomplete user data received."); // ⬅️ throw so modal can catch it
      }

      setUsers((prev) => [...prev, data.user]);
      console.log("✅ User added:", data.user);
    } catch (error) {
      console.error("❌ Error adding user:", error);
      throw error; // ⬅️ Re-throw so the modal can display the error
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        users,
        totalUsers,
        totalAdmins,
        loading,
        fetchAllUsers,
        addUserByAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used inside AdminProvider");
  return context;
};
