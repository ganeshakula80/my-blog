"use client";
import { useEffect, useState } from "react";
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
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user || !user.id) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/userdetails/${user.id}`
        );
        setDetails(res.data.user || res.data);
        setForm({
          name: (res.data.user ? res.data.user.name : res.data.name) || "",
          bio: (res.data.user ? res.data.user.bio : res.data.bio) || "",
          profilePic:
            (res.data.user ? res.data.user.profilePic : res.data.profilePic) ||
            "",
        });
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    if (user && user.id) {
      fetchUserDetails();
    }
  }, [user]);

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
        form
      );
      setDetails(res.data);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Update failed. Please try again.");
    }
  };

  if (!user) return <div>Please login to view your details.</div>;
  if (!details) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Details</h1>
      <div className="flex items-center space-x-6">
        <div>
          <img
            src={form.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-blue-500"
          />
        </div>
        <div className="flex-1">
          {editing ? (
            <>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
                placeholder="Name"
              />
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
                placeholder="Bio"
              />
              <input
                type="text"
                name="profilePic"
                value={form.profilePic}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
                placeholder="Profile Picture URL"
              />
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold">{details.name}</h2>
              <p className="mt-2 text-gray-600">Bio: {details.bio}</p>
              <div className="mt-4">
                <p>
                  <strong>Posts:</strong> {details.noOfPosts}
                </p>
                <p>
                  <strong>Followers:</strong> {details.followers}
                </p>
              </div>
              <button
                className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
