const User = require("../models/user");
const Blog = require("../models/Blog");

// GET user details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "name profilePic bio followers noOfPosts"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("GetUserDetails error:", err); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
};

// PUT update user details
exports.updateUserDetails = async (req, res) => {
  try {
    const { name, profilePic, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { name, profilePic, bio },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};
