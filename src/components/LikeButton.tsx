"use client";
import { useEffect, useState } from "react";

interface LikeButtonProps {
  blogId: string;
  userId: string; // Allow empty string as valid
}

// Define an interface for a single Like object
interface Like {
  _id?: string; // Optional: if your backend sends an ID for the like itself
  userId: string;
}

interface LikeResponse {
  likes: Like[]; // Use the Like interface
  liked: boolean;
  message?: string; // Optional: if the toggle endpoint sends a message
}

const LikeButton: React.FC<LikeButtonProps> = ({ blogId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<Like[]>([]); // Use Like[] for state

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/likes/${blogId}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch likes. Status: ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data: LikeResponse = await res.json(); // Type the data
          setLikes(data.likes || []); // Set likes if available
          setLiked(data.likes.some((like: Like) => like.userId === userId)); // Use Like type in callback
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
        const data: LikeResponse = await res.json(); // Type the data
        setLiked(data.liked);
        setLikes(data.likes);
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
