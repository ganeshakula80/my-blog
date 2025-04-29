const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "Title and content required" });

  try {
    const blog = new Blog({
      title,
      content,
      author: req.user.id,
    });
    await blog.save();

    res.status(201).json({ message: "Blog created", blog });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name profilePic"
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name profilePic");
    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
