"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image';
// import { useUser } from "@/contexts/UserContexts"; // Commented out as it's unused

interface User {
  _id: string;
  name: string;
  bio: string;
  profilePic: string;
  noOfPosts: number;
  followers: number;
}

const UserSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from backend
    const fetchUsers = async () => {
      if (!searchTerm.trim()) { // Optional: Avoid searching for empty strings
        setUsers([]);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/userdetails/search?search=${searchTerm}`
        );
        console.log(response.data);
        setUsers(response.data.users || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]); // Clear users on error
      }
    };

    fetchUsers();
  }, [searchTerm]); // re-fetch when searchTerm changes

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Search Users</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
      />

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="flex items-center space-x-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden"> 
                <Image
                  src={user.profilePic || "/default-profile.png"}
                  alt={user.name || "User profile picture"}
                  fill
                  sizes="48px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearchPage;
