"use client";
import { useEffect, useState, useCallback } from "react";
import { useUser } from "@/contexts/UserContexts";
import axios from "axios";

type UserDetails = {
  _id: string;
  name: string;
  bio: string;
  profilePic: string;
  noOfPosts: number;
  followers: number;
};

const UserDetails = () => {
  const { user } = useUser();
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    profilePic: "",
    noOfPosts: 0,
    followers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = useCallback(async () => {
    if (!user || !user.id) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    console.log("Fetching user details...");
    try {
      const res = await axios.get(
        `http://localhost:5000/api/userdetails/${user.id}`
      );
      const userData = res.data.user || res.data;
      if (userData) {
        setDetails(userData);
        setForm({
          name: userData.name || "",
          bio: userData.bio || "",
          profilePic: userData.profilePic || "",
          noOfPosts: userData.noOfPosts || 0,
          followers: userData.followers || 0,
        });
      } else {
        console.error("User data not found in response:", res.data);
        setDetails(null);
      }
    } catch (err) {
      console.error("Failed to fetch user details:", err);
      setDetails(null);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.id) {
      fetchUserDetails();

      window.addEventListener("focus", fetchUserDetails);
      console.log("Focus listener added");

      return () => {
        window.removeEventListener("focus", fetchUserDetails);
        console.log("Focus listener removed");
      };
    } else {
      setDetails(null);
      setIsLoading(false);
    }
  }, [user, fetchUserDetails]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!user || !user.id) {
      alert("User not found. Please login again.");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:5000/api/userdetails/${user.id}`,
        { name: form.name, bio: form.bio, profilePic: form.profilePic }
      );
      const updatedUserData = res.data.user || res.data;
      setDetails(updatedUserData);
      setForm({
        name: updatedUserData.name || "",
        bio: updatedUserData.bio || "",
        profilePic: updatedUserData.profilePic || "",
        noOfPosts: updatedUserData.noOfPosts || 0,
        followers: updatedUserData.followers || 0,
      });
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Update failed. Please try again.");
    }
  };

  if (!user)
    return (
      <div className="text-center p-4">Please login to view your details.</div>
    );
  if (isLoading)
    return <div className="text-center p-4">Loading user details...</div>;
  if (!details)
    return <div className="text-center p-4">Could not load user details.</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-shrink-0">
          <img
            src={editing ? form.profilePic : details.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
            width={128}
            height={128}
            onError={(e) => {
              e.currentTarget.src = "/images/default-profile-pic.jpg";
            }}
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          {editing ? (
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
              />
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full border p-2 rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bio"
              />
              <input
                type="text"
                name="profilePic"
                value={form.profilePic}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Profile Picture URL"
              />
              <div className="flex justify-center sm:justify-start space-x-2">
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-150 ease-in-out"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setForm({
                      name: details.name || "",
                      bio: details.bio || "",
                      profilePic: details.profilePic || "",
                      noOfPosts: details.noOfPosts || 0,
                      followers: details.followers || 0,
                    });
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-150 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{details.name}</h2>
              <p className="mt-1 text-gray-600">
                {details.bio || "No bio provided."}
              </p>
              <div className="mt-3 text-sm text-gray-500 space-x-4">
                <span>
                  <strong>Posts:</strong> {details.noOfPosts}
                </span>
                <span>
                  <strong>Followers:</strong> {details.followers}
                </span>
              </div>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-150 ease-in-out"
                onClick={() => {
                  setEditing(true);
                  setForm({
                    name: details.name || "",
                    bio: details.bio || "",
                    profilePic: details.profilePic || "",
                    noOfPosts: details.noOfPosts || 0,
                    followers: details.followers || 0,
                  });
                }}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
