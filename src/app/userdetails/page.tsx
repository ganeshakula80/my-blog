// src/app/userdetails/page.tsx
"use client";
import { useState } from "react";

const UserDetails = () => {
  // Sample user data (you can replace this with actual data or API calls)
  const [user] = useState({
    name: "John Doe",
    profilePic: "/images/default-profile-pic.jpg", // default profile pic (you can replace this path)
    posts: 10,
    followers: 100,
    bio: "Full-stack developer, passionate about blogging and sharing knowledge.",
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Details</h1>

      <div className="flex items-center space-x-6">
        {/* Profile Picture */}
        <div>
          <img
            src={user.profilePic}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full border-2 border-blue-500"
          />
        </div>

        {/* User Information */}
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="mt-2 text-gray-600">Bio: {user.bio}</p>
          <div className="mt-4">
            <p>
              <strong>Posts:</strong> {user.posts}
            </p>
            <p>
              <strong>Followers:</strong> {user.followers}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile Button (for future feature implementation) */}
      <div className="mt-8">
        <button className="bg-blue-500 text-white p-2 rounded-lg">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
