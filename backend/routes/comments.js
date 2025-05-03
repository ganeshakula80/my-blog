const express = require("express");
const router = express.Router();
const {
  getCommentsByBlog,
  addComment,
} = require("../controllers/commentController");

router.get("/:blogId", getCommentsByBlog);
router.post("/", addComment);

module.exports = router;
