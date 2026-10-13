const pool = require("../config/db");

// GET /skills
const getSkills = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM skills ORDER BY id"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get skills"
        });
    }
};

// POST /skills
const createSkill = async (req, res) => {
    try {
        const { name, level } = req.body;

        const result = await pool.query(
            "INSERT INTO skills (name, level) VALUES ($1, $2) RETURNING *",
            [name, level]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create skill"
        });
    }
};

// PUT /skills/:id
const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, level } = req.body;

        const result = await pool.query(
            "UPDATE skills SET name = $1, level = $2 WHERE id = $3 RETURNING *",
            [name, level, id]
        );

        res.json(result.rows[0] || {});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update skill"
        });
    }
};

// DELETE /skills/:id
const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM skills WHERE id = $1",
            [id]
        );

        res.json({
            message: "Skill deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete skill"
        });
    }
};

module.exports = {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill
};