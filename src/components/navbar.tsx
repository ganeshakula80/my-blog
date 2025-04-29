"use client";
import Link from "next/link";
import { useUser } from "@/contexts/UserContexts";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-xl font-bold cursor-pointer">
            My Blog
          </span>
        </Link>
        <div className="space-x-4">
          <Link href="/">
            <span className="text-white cursor-pointer">Blogs</span>
          </Link>
          <Link href="/create">
            <span className="text-white cursor-pointer">Create Blog</span>
          </Link>
          <Link href="/userdetails">
            <span className="text-white cursor-pointer">User Details</span>
          </Link>

          {!user ? (
            <>
              <Link href="/login">
                <span className="text-white cursor-pointer">Login</span>
              </Link>
              <Link href="/register">
                <span className="text-white cursor-pointer">Register</span>
              </Link>
            </>
          ) : (
            <span className="text-white cursor-pointer">
              Welcome, {user.name}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
