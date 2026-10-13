const pool = require("../config/db");

// GET /projects
const getProjects = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM projects ORDER BY id"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get projects"
        });
    }
};

// POST /projects
const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            image_url,
            project_url
        } = req.body;

        const result = await pool.query(
            `INSERT INTO projects
            (title, description, image_url, project_url)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [title, description, image_url, project_url]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create project"
        });
    }
};

// PUT /projects/:id
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            image_url,
            project_url
        } = req.body;

        const result = await pool.query(
            `UPDATE projects
            SET title = $1,
                description = $2,
                image_url = $3,
                project_url = $4,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING *`,
            [title, description, image_url, project_url, id]
        );

        res.json(result.rows[0] || {});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update project"
        });
    }
};

// DELETE /projects/:id
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM projects WHERE id = $1",
            [id]
        );

        res.json({
            message: "Project deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete project"
        });
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};