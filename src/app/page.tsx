import Link from "next/link";

const Home = () => {
  const blogs = [
    {
      id: 1,
      title: "Blog 1",
      description: "Description of Blog 1",
      thumbnail: "path-to-thumbnail-image.jpg", // replace with actual image
      author: {
        username: "JohnDoe",
        profilePicture: "path-to-profile-image.jpg", // replace with actual image
      },
      date: "2023-08-01T12:00:00Z",
      category: "Tech",
    },
    {
      id: 2,
      title: "Blog 2",
      description: "Description of Blog 2",
      thumbnail: "path-to-thumbnail-image.jpg", // replace with actual image
      author: {
        username: "JaneDoe",
        profilePicture: "path-to-profile-image.jpg", // replace with actual image
      },
      date: "2023-08-05T14:30:00Z",
      category: "Lifestyle",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome to My Blog</h1>
      
      <div className="mt-6">
        <h2 className="text-2xl">Blog List</h2>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id} className="mt-6 p-4 border rounded-lg">
              <div className="flex flex-col md:flex-row">
                {/* Blog Thumbnail */}
                <div className="w-full md:w-1/4">
                  <img src={blog.thumbnail} alt={blog.title} className="w-full h-40 object-cover rounded-lg" />
                </div>
                
                <div className="md:ml-4 flex flex-col justify-between">
                  {/* Title and Short Description */}
                  <Link href={`/blog/${blog.id}`} className="text-2xl text-blue-500 hover:underline">{blog.title}</Link>
                  <p className="mt-2 text-gray-600">{blog.description}</p>
                  
                  {/* Author, Profile Picture, Date, and Category */}
                  <div className="mt-4 text-sm text-gray-500 flex items-center space-x-2">
                    {/* Author Profile Picture */}
                    <img 
                      src={blog.author.profilePicture} 
                      alt={blog.author.username} 
                      className="w-8 h-8 rounded-full object-cover" 
                    />
                    
                    {/* Author Username */}
                    <p>{blog.author.username}</p>
                    <p>{new Date(blog.date).toLocaleDateString()}</p>
                    <p className="italic">{blog.category}</p>
                  </div>
                  
                  {/* View Details Button */}
                  <Link href={`/blog/${blog.id}`}>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">Read More</button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;


