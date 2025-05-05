const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  createBlog,
  getBlogById,
  getAllBlogs,
  deleteBlog,
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", authMiddleware, createBlog);
router.delete("/delete/:id", authMiddleware, deleteBlog);

module.exports = router;
