"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome to My Blog</h1>
      <div className="mt-6">
        <h2 className="text-2xl">Blog Feed</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {blogs.map((blog) => (
              <li key={blog._id} className="mt-4 border-b pb-4">
                <div className="flex items-center">
                  <img
                    src={
                      blog.author?.profilePic || "/path/to/default-profile.jpg"
                    }
                    alt="Profile Picture"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <span className="font-semibold">
                      {blog.author?.name || "Anonymous"}
                    </span>
                    <p className="text-gray-500 text-sm">
                      Posted on {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-bold mt-2">
                  <Link href={`/blog/${blog._id}`}>{blog.title}</Link>
                </h3>
                <p className="mt-2">{blog.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
