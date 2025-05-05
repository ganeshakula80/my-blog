// src/contexts/UserContexts.tsx
"use client";

interface User {
  name: string;
  profilePic?: string;
}

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define a type for the user object
interface User {
  id: string; // or _id, depending on backend, but use id for consistency
  name: string;
  email: string;
  profilePic?: string;
  noOfPosts?: number;
  followers?: number;
  bio?: string;
  // Add any other fields you use
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

  // Persist user to localStorage on login
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
    // Do NOT remove user from localStorage when user is null (prevents clearing on refresh)
  }, [user]);

  // Rehydrate user from localStorage and token on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.id) {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
          }
        })
        .catch((err) => {
          console.error("Error fetching user", err);
          localStorage.removeItem("token");
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = () => useContext(UserContext);
