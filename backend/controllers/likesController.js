const Blog = require("../models/Blog");

exports.toggleLike = async (req, res) => {
  try {
    const { blogId, userId } = req.body;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const liked = blog.likes.includes(userId);

    if (liked) {
      blog.likes = blog.likes.filter((id) => id.toString() !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();
    // Send the updated array and the new liked status
    res.status(200).json({ likes: blog.likes, liked: !liked });
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle like" });
  }
};

// GET likes for a specific blog
exports.getLikes = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // The frontend expects an object with a 'likes' array
    res.status(200).json({ likes: blog.likes });

  } catch (error) {
    console.error("Error fetching likes:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to fetch likes" });
  }
};
