// src/contexts/UserContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define a type for the user object
interface User {
  username: string;
  profilePicture: string;
}

// Create the context
const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null, // Default user is null
  setUser: () => {}, // Default function
});

// Create the UserProvider component to manage the user state
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null); // User state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = () => useContext(UserContext);
