// src/app/login/page.tsx

import { useState } from "react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Example check for login credentials (this is where you can add your actual login logic)
    if (email === "user@example.com" && password === "password") {
      // After successful login, redirect to home page (or user details page)
      router.push("/"); // Home page with blogs
      // Or, you can redirect to the user details page like this:
      // router.push("/userdetails");
    } else {
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="mt-4">
        <div>
          <label htmlFor="email" className="block text-sm">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

