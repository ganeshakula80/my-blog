// src/app/login/page.tsx

import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useUser(); // Get the function to set user data
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulating a successful login
    const userData = {
      username: username,
      profilePic: "/path/to/profile-pic.jpg", // You can change this path dynamically
      email: "user@example.com",
      noOfPosts: 10,
      followers: 100,
    };

    // Set user data using context
    setUserData(userData);

    // Redirect to the home page after login
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 mb-4"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-4"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

