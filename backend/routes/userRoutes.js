const express = require("express");
const jwt = require("jsonwebtoken");
const { searchUsers } = require("../controllers/userController");
const {
  getUserDetails,
  updateUserDetails,
} = require("../controllers/userController");

const router = express.Router();

// GET search users
router.get("/search", searchUsers);

// GET user details
router.get("/:userId", getUserDetails);

// PUT update user details
router.put("/:userId", updateUserDetails); 

module.exports = router;
