"use client";
import { useEffect, useState, use } from "react";
import { useUser } from "@/contexts/UserContexts";
import React from "react";
import Image from 'next/image';

import CommentSection from "@/components/commentSection";
import LikeButton from "@/components/LikeButton";

// Define an interface for the Blog object
interface Author {
  _id: string;
  username: string;
  profilePic?: string;
  name?: string;
}

interface Comment {
  _id: string;
  text: string;
  author: Author;
  createdAt: string;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: Author;
  imageUrl?: string;
  tags?: string[];
  category?: string;
  likes: string[]; // Array of user IDs who liked the post
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

const BlogDetail = ({ params: paramsPromise }: { params: Promise<{ id: string }> }) => {
  const params = use(paramsPromise);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const id = params.id;
  const userId = user?.id || "";

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

  console.log("Blog Author Data:", blog.author);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <div className="flex items-center mt-2 mb-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-2">
          <Image
            src={blog.author?.profilePic || "/default-profile.png"}
            alt={blog.author?.name || "Author profile picture"}
            fill
            sizes="40px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <span className="font-semibold">
          {blog.author?.name || "Anonymous"}
        </span>
        <span className="ml-4 text-gray-500 text-sm">
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p>{blog.content}</p>
      {blog?._id && userId && (
        <>
          <LikeButton blogId={blog._id} userId={userId} />
          <CommentSection blogId={blog._id} userId={userId} />
        </>
      )}
    </div>
  );
}

export default BlogDetail;
