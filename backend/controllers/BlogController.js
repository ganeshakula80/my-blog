const Blog = require("../models/Blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

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
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { noOfPosts: 1 },
    });

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

exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id; // from authMiddleware

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this blog" });
    }

    await blog.deleteOne();
    // Recalculate the number of posts by this user
    const totalPosts = await Blog.countDocuments({ author: userId });

    // Update user's noOfPosts field
    await User.findByIdAndUpdate(userId, { noOfPosts: totalPosts });
    {
      message: "Post deleted and user post count updated";
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
