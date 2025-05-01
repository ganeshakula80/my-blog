"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

type Blog = {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string;
    profilePic: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
};

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data: { blogs: Blog[] }) => {
        setBlogs(data.blogs || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.error("Error fetching blogs");
      });

    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
  }, []);

  // const handleDelete = async (postId: string) => {
  //   try {
  //     const token = sessionStorage.getItem("token");
  //     if (!token) {
  //       alert("You must be logged in to delete posts.");
  //       return;
  //     }

  //     const res = await fetch(
  //       `http://localhost:5000/api/blogs/delete/${postId}`, // Corrected URL format

  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // Log the response status
  //     console.log("Response status:", res.status);

  //     if (!res.ok) {
  //       // If response is not ok, log the text response for further investigation
  //       const errorText = await res.text();
  //       console.log("Error text:", errorText);
  //       throw new Error("Failed to delete post");
  //     }

  //     // Assuming response is JSON if status is ok
  //     const data = await res.json();
  //     alert("Post deleted successfully");
  //     setBlogs((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  //   } catch (err) {
  //     console.error("Error in handleDelete:", err);
  //     alert("Error deleting post");
  //   }
  // };

  const handleDelete = async (postId: string) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete posts.");
        return;
      }

      const res = await fetch(
        `http://localhost:5000/api/blogs/delete/${postId}`, // Corrected URL format
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Log the response status
      console.log("Response status:", res.status);

      if (!res.ok) {
        // If response is not ok, log the text response for further investigation
        const errorText = await res.text();
        console.log("Error text:", errorText);
        throw new Error("Failed to delete post");
      }

      // Post deleted successfully, update state
      alert("Post deleted successfully");
      setBlogs((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error in handleDelete:", err);
      alert("Error deleting post");
    }
  };

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
                  <Image
                    src={
                      blog.author?.profilePic || "/path/to/default-profile.jpg"
                    }
                    alt="Profile Picture"
                    className="w-12 h-12 rounded-full mr-4"
                    width={48}
                    height={48}
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
                {userId === blog.author?._id && (
                  <h3
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(blog._id)}
                  >
                    delete
                  </h3>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
