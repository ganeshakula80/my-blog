const express = require("express");
const { register, login } = require("../controllers/authController");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // You can fetch user from DB using decoded.id if needed
    res.json({
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      profilePic: decoded.profilePic,
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});
router.post("/register", register);
router.post("/login", login);
module.exports = router;
