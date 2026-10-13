const express = require("express");

const {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog
} = require("../controllers/blogsController");

const authenticateToken =
    require("../middleware/authMiddleware");

const router = express.Router();

// Public: frontend can read blogs
router.get("/", getBlogs);

// Protected: only admin can modify blogs
router.post("/", authenticateToken, createBlog);

router.put(
    "/:id",
    authenticateToken,
    updateBlog
);

router.delete(
    "/:id",
    authenticateToken,
    deleteBlog
);

module.exports = router;