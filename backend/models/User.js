const mongoose = require("mongoose");
const Blog = require("../models/Blog");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "/images/default-profile-pic.jpg" },
    bio: { type: String, default: "" },
    noOfPosts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError on hot reloads
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
