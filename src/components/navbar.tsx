import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-xl font-bold">My Blog</span>
        </Link>
        <div className="space-x-4">
          <Link href="/">
            <span className="text-white">Blogs</span>
          </Link>
          <Link href="/create">
            <span className="text-white">Create Blog</span>
          </Link>
          <Link href="/userdetails">
            <span className="text-white">User Details</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
