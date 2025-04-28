// src/app/create/page.tsx
"use client";
import { useState } from "react";
import { useUser } from "@/contexts/UserContexts";
import { useRouter } from "next/navigation"; // Import the router to handle redirects

const CreateBlog = () => {
  const { user } = useUser(); // Get the user data from context
  const router = useRouter(); // Router to handle redirection after successful form submission

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle blog creation logic here (you may need backend integration)
    // For now, we will just log the data
    console.log({ title, content });

    // Redirect to homepage after submission (or a blog detail page)
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog</h1>

      {/* Display User Information */}
      {user ? (
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user.profilePic}
            alt="User Profile"
            className="w-12 h-12 rounded-full border-2 border-blue-500"
          />
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Please log in to create a blog.</p>
      )}

      {/* Blog Creation Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block mb-2">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="p-2 border border-gray-300 rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="content" className="block mb-2">
            Blog Content
          </label>
          <textarea
            id="content"
            name="content"
            className="p-2 border border-gray-300 rounded w-full"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
