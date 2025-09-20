import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useGlobalState } from "./GlobalContext";

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  joinContestRoom: (contestId: string) => void;
  leaveContestRoom: (contestId: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
  joinContestRoom: () => {},
  leaveContestRoom: () => {},
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { state } = useGlobalState();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Check if user is logged in by checking if user exists
    const isAuthenticated = !!state.user; // Convert to boolean

    // Only connect to socket if user is logged in
    if (state.user && isAuthenticated) {
      const SOCKET_URL =
        process.env.REACT_APP_SOCKET_URL || "http://localhost:4000";
      const socketInstance = io(SOCKET_URL, {
        withCredentials: true,
      });

      socketInstance.on("connect", () => {
        console.log("Socket connected");
        setConnected(true);
      });

      socketInstance.on("disconnect", () => {
        console.log("Socket disconnected");
        setConnected(false);
      });

      socketInstance.on("error", (error) => {
        console.error("Socket error:", error);
        setConnected(false);
      });

      setSocket(socketInstance);

      // Cleanup function
      return () => {
        socketInstance.disconnect();
      };
    }
  }, [state.user]); // Only depend on state.user, not isAuthenticated

  const joinContestRoom = (contestId: string) => {
    if (socket && connected) {
      socket.emit("join-contest", contestId);
      console.log(`Joined contest room: ${contestId}`);
    }
  };

  const leaveContestRoom = (contestId: string) => {
    if (socket && connected) {
      socket.emit("leave-contest", contestId);
      console.log(`Left contest room: ${contestId}`);
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, connected, joinContestRoom, leaveContestRoom }}
    >
      {children}
    </SocketContext.Provider>
  );
};
