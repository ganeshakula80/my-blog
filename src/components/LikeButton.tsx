"use client";
import { useEffect, useState } from "react";

interface LikeButtonProps {
  blogId: string;
  userId: string; // Allow empty string as valid
}

interface LikeResponse {
  likes: Array<any>;
  liked: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ blogId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<LikeResponse["likes"]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/likes/${blogId}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch likes. Status: ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setLikes(data.likes || []); // Set likes if available
          setLiked(data.likes.some((like: any) => like.userId === userId)); // Check if the current user has liked the post
        } else {
          throw new Error("Response is not JSON.");
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [blogId, userId]);

  const toggleLike = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, userId }),
      });

      if (res.ok) {
        const result: LikeResponse = await res.json();
        setLikes(result.likes); // Update likes
        setLiked(result.liked); // Update liked state based on response
      } else {
        throw new Error(`Failed to toggle like. Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <button onClick={toggleLike} className="text-xl">
        <span style={{ color: liked ? "red" : "gray", fontSize: "24px" }}>
          ♥
        </span>
      </button>
      <span>{likes.length} Likes</span>
    </div>
  );
};

export default LikeButton;
