const Comment = require("../models/Comments");

// GET comments for a specific blog
exports.getCommentsByBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comment.find({ blogId }).populate(
      "userId",
      "name profilePic"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

// POST a new comment
exports.addComment = async (req, res) => {
  try {
    const { blogId, userId, comment } = req.body;
    const newComment = new Comment({ blogId, userId, comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};
