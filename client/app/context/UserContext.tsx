"use client";
import { createContext, ReactNode, useContext, useState } from "react";

// Define the type for the context value
interface UserContextValue {
  user: any;
  setUser: (user: any) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

// Provide a default value for the UserContext
const UserContext = createContext<UserContextValue | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<any>(null); // This state will hold the user data

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
