const express = require("express");
const router = express.Router();
const { toggleLike } = require("../controllers/likesController");
const { getLikes } = require("../controllers/likesController");

router.post("/", toggleLike);
router.get("/:blogId", getLikes);

module.exports = router;
