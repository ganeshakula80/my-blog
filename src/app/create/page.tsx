"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContexts";
import Image from "next/image";

const CreateBlog = () => {
  const { user } = useUser();
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to create a blog.");
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create blog");
      alert("Blog created!");
      router.push(`/blog/${data.blog._id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog</h1>

      {user ? (
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
            <Image
              src={user?.profilePic || "/default-profile.png"}
              alt={user.name || "User profile picture"}
              fill
              sizes="48px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <p className="text-xl font-semibold">{user.name}</p>
        </div>
      ) : (
        <p className="text-gray-500">Please log in to create a blog.</p>
      )}

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
            value={form.title}
            onChange={handleChange}
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
            rows={6}
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
