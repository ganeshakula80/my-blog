const express = require("express");
const {
  createBlog,
  getBlogById,
  getAllBlogs,
} = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", authMiddleware, createBlog);

module.exports = router;
