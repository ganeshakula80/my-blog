"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContexts";

interface BlogDetailProps {
  params: { id: string };
}

const BlogDetail = ({ params }: BlogDetailProps) => {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const id = params.id;

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/blogs/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch blog");
          }
          return res.json();
        })
        .then((data) => {
          setBlog(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <div className="flex items-center mt-2 mb-4">
        <img
          src={blog.author?.profilePic || "/path/to/default-profile.jpg"}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-2"
        />
        <span className="font-semibold">
          {blog.author?.name || "Anonymous"}
        </span>
        <span className="ml-4 text-gray-500 text-sm">
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
