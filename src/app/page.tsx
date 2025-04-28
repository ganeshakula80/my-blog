// src/app/page.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    // Simulating fetching blogs and user data from local storage or context
    const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    setBlogs(storedBlogs);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome to My Blog</h1>
      <div className="mt-6">
        <h2 className="text-2xl">Blog Feed</h2>
        <ul>
          {blogs.map((blog, index) => (
            <li key={index} className="mt-4 border-b pb-4">
              <div className="flex items-center">
                {/* Profile Picture */}
                <img
                  src={
                    blog.userProfilePicture || "/path/to/default-profile.jpg"
                  } // Profile picture (fallback if not available)
                  alt="Profile Picture"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  {/* User Name */}
                  <span className="font-semibold">
                    {blog.username || "Anonymous"}
                  </span>
                  {/* Post Date */}
                  <p className="text-gray-500 text-sm">
                    Posted on {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Blog Post Title */}
              <h3 className="text-xl font-bold mt-2">
                <Link href={`/blog/${index}`}>{blog.title}</Link>
              </h3>

              {/* Blog Post Content */}
              <p className="mt-2">{blog.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
