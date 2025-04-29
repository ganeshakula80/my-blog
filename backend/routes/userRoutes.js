const express = require("express");
const {
  getUserDetails,
  updateUserDetails,
} = require("../controllers/userController");

const router = express.Router();

// GET user details
router.get("/:userId", getUserDetails);

// PUT update user details
router.put("/:userId", updateUserDetails); // 👈 Add this line

module.exports = router;
