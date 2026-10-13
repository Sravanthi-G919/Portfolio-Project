const pool = require("../config/db");

// ==================== GET ALL EXPERIENCE ====================

const getExperience = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM experience ORDER BY id DESC"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get experience"
        });
    }
};


// ==================== CREATE EXPERIENCE ====================

const createExperience = async (req, res) => {
    try {
        const {
            title,
            company,
            description,
            start_date,
            end_date
        } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Experience title is required"
            });
        }

        const result = await pool.query(
            `INSERT INTO experience
            (title, company, description, start_date, end_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [
                title,
                company,
                description,
                start_date || null,
                end_date || null
            ]
        );

        res.status(201).json({
            message: "Experience created successfully",
            experience: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create experience"
        });
    }
};


// ==================== UPDATE EXPERIENCE ====================

const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            company,
            description,
            start_date,
            end_date
        } = req.body;

        const result = await pool.query(
            `UPDATE experience
            SET
                title = $1,
                company = $2,
                description = $3,
                start_date = $4,
                end_date = $5
            WHERE id = $6
            RETURNING *`,
            [
                title,
                company,
                description,
                start_date || null,
                end_date || null,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Experience not found"
            });
        }

        res.json({
            message: "Experience updated successfully",
            experience: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update experience"
        });
    }
};


// ==================== DELETE EXPERIENCE ====================

const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM experience WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Experience not found"
            });
        }

        res.json({
            message: "Experience deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete experience"
        });
    }
};


module.exports = {
    getExperience,
    createExperience,
    updateExperience,
    deleteExperience
};