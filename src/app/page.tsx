// src/app/page.tsx

import Link from "next/link";

const Home = () => {
  const blogs = [
    { id: 1, title: "Blog 1", description: "Description of Blog 1" },
    { id: 2, title: "Blog 2", description: "Description of Blog 2" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome to My Blog</h1>
      <div className="mt-6">
        <h2 className="text-2xl">Blog List</h2>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id} className="mt-4">
              <Link href={`/blog/${blog.id}`}>
                <span className="text-blue-500">{blog.title}</span>
              </Link>
              <p>{blog.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl">Login / Register</h2>
        <div className="space-x-4">
          <Link href="/login">
            <span className="text-blue-500">Login</span>
          </Link>
          <Link href="/register">
            <span className="text-blue-500">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

