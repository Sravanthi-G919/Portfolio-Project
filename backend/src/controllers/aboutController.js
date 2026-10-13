const pool = require("../config/db");

// GET /about
const getAbout = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM about ORDER BY id LIMIT 1"
        );

        res.json(result.rows[0] || {});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get about information"
        });
    }
};

// PUT /about
const updateAbout = async (req, res) => {
    try {
        const { content } = req.body;

        const existing = await pool.query(
            "SELECT id FROM about ORDER BY id LIMIT 1"
        );

        if (existing.rows.length === 0) {
            const result = await pool.query(
                "INSERT INTO about (content) VALUES ($1) RETURNING *",
                [content]
            );

            return res.json(result.rows[0]);
        }

        const result = await pool.query(
            "UPDATE about SET content = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
            [content, existing.rows[0].id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update about information"
        });
    }
};

module.exports = {
    getAbout,
    updateAbout
};