// src/app/page.tsx

import { useUser } from "@/contexts/UserContext";  // Import the useUser hook to access user data
import Link from "next/link"; // Import Link from Next.js

// Mock blogs for demonstration
const blogs = [
  { id: 1, title: "Blog 1", description: "Description of Blog 1" },
  { id: 2, title: "Blog 2", description: "Description of Blog 2" },
];

const Home = () => {
  const { user } = useUser();  // Get the user data from context

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to My Blog</h1>

      {/* Display User Information */}
      {user ? (
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user.profilePic}
            alt="User Profile"
            className="w-12 h-12 rounded-full border-2 border-blue-500"
          />
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-500">Posts: {user.postsCount}</p>
            <p className="text-gray-500">Followers: {user.followersCount}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Please log in to see your profile.</p>
      )}

      {/* Display List of Blogs */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Blog List</h2>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id} className="mt-4">
              <Link href={`/blog/${blog.id}`}>
                <span className="text-blue-500 text-lg font-medium">{blog.title}</span>
              </Link>
              <p className="text-gray-600">{blog.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;


