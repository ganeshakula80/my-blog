"use client";
import { useState, useEffect } from "react";

interface Comment {
  _id: string;
  comment: string;
  userId: {
    name: string;
    profilePic?: string;
  };
  createdAt: string;
}

interface CommentSectionProps {
  blogId: string;
  userId: string; // Allow empty string as valid
}
const CommentSection: React.FC<CommentSectionProps> = ({ blogId, userId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/comments/${blogId}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error fetching comments", err));
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId, userId, comment: newComment }),
    });

    if (res.ok) {
      const saved = await res.json();
      setComments((prev) => [...prev, saved]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-2">Comments</h3>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="border px-3 py-2 w-full rounded"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Post
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c._id} className="border p-3 rounded">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={c.userId?.profilePic || "/default-profile.jpg"}
                className="w-8 h-8 rounded-full"
                alt="profile"
              />
              <span className="font-medium">{c.userId?.name}</span>
              <span className="text-sm text-gray-500 ml-auto">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p>{c.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
