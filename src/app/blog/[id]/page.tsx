// src/app/blog/[id]/page.tsx

const blogs = [
  { id: 1, title: "Blog 1", description: "Description of Blog 1" },
  { id: 2, title: "Blog 2", description: "Description of Blog 2" },
];

interface BlogDetailProps {
  params: { id: string };
}

const BlogDetail = ({ params }: BlogDetailProps) => {
  const blog = blogs.find((b) => b.id === parseInt(params.id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p>{blog.description}</p>
    </div>
  );
};

export default BlogDetail;
