const pool = require("../config/db");

// GET /blogs
const getBlogs = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM blogs ORDER BY id"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get blogs"
        });
    }
};

// POST /blogs
const createBlog = async (req, res) => {
    try {
        const {
            title,
            content,
            image_url
        } = req.body;

        const result = await pool.query(
            `INSERT INTO blogs
            (title, content, image_url)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [title, content, image_url]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create blog"
        });
    }
};

// PUT /blogs/:id
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            content,
            image_url
        } = req.body;

        const result = await pool.query(
            `UPDATE blogs
            SET title = $1,
                content = $2,
                image_url = $3,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *`,
            [title, content, image_url, id]
        );

        res.json(result.rows[0] || {});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update blog"
        });
    }
};

// DELETE /blogs/:id
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM blogs WHERE id = $1",
            [id]
        );

        res.json({
            message: "Blog deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete blog"
        });
    }
};

module.exports = {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog
};