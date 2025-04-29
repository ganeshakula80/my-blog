require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());
const authRoutes = require("./routes/auth"); // path might differ
app.use("/api/auth", authRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/userdetails", userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
