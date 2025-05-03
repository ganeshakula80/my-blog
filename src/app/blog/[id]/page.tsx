"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContexts";
import React from "react";
import { useParams } from "next/navigation";

import CommentSection from "@/components/commentSection";
import LikeButton from "@/components/LikeButton";

interface BlogDetailProps {
  params: {
    id: string;
    userId: string;
    blogId: string;
  };
}

const BlogDetail: React.FC<BlogDetailProps> = ({ params }) => {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const id = useParams().id;
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
      {blog?._id && userId && (
        <>
          <LikeButton blogId={blog._id} userId={userId} />
          <CommentSection blogId={blog._id} userId={userId} />
        </>
      )}
    </div>
  );
};

export default BlogDetail;
// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// interface Author {
//   name?: string;
//   profilePic?: string;
// }

// interface Blog {
//   _id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   author?: Author;
// }

// const BlogDetail = ({ params }: BlogDetailProps) => {
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const id = params.id;

//   useEffect(() => {
//     if (id) {
//       fetch(`http://localhost:5000/api/blogs/${id}`)
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error("Failed to fetch blog");
//           }
//           return res.json();
//         })
//         .then((data: Blog) => {
//           setBlog(data);
//           setLoading(false);
//         })
//         .catch((err: Error) => {
//           setError(err.message);
//           setLoading(false);
//         });
//     }
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!blog) return <div>Blog not found</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold">{blog.title}</h1>
//       <div className="flex items-center mt-2 mb-4">
//         <Image
//           src={blog.author?.profilePic || "/path/to/default-profile.jpg"}
//           alt="Profile"
//           width={40}
//           height={40}
//           className="rounded-full mr-2"
//         />
//         <span className="font-semibold">
//           {blog.author?.name || "Anonymous"}
//         </span>
//         <span className="ml-4 text-gray-500 text-sm">
//           {new Date(blog.createdAt).toLocaleDateString()}
//         </span>
//       </div>
//       <p>{blog.content}</p>
//     </div>
//   );
// };

// export default BlogDetail;
