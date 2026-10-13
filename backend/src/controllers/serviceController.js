const pool = require("../config/db");

// ==================== GET ALL SERVICES ====================

const getServices = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM services ORDER BY id DESC"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to get services"
        });
    }
};


// ==================== CREATE SERVICE ====================

const createService = async (req, res) => {
    try {

        const {
            title,
            description
        } = req.body;


        if (!title || !description) {

            return res.status(400).json({
                message: "Title and description are required"
            });
        }


        const result = await pool.query(
            `INSERT INTO services
            (title, description)
            VALUES ($1, $2)
            RETURNING *`,
            [
                title,
                description
            ]
        );


        res.status(201).json({

            message: "Service created successfully",

            service: result.rows[0]

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create service"
        });
    }
};


// ==================== UPDATE SERVICE ====================

const updateService = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description
        } = req.body;


        const result = await pool.query(

            `UPDATE services

            SET
                title = $1,
                description = $2,
                updated_at = CURRENT_TIMESTAMP

            WHERE id = $3

            RETURNING *`,

            [
                title,
                description,
                id
            ]

        );


        if (result.rows.length === 0) {

            return res.status(404).json({

                message: "Service not found"

            });
        }


        res.json({

            message: "Service updated successfully",

            service: result.rows[0]

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to update service"

        });
    }
};


// ==================== DELETE SERVICE ====================

const deleteService = async (req, res) => {

    try {

        const { id } = req.params;


        const result = await pool.query(

            "DELETE FROM services WHERE id = $1 RETURNING *",

            [id]

        );


        if (result.rows.length === 0) {

            return res.status(404).json({

                message: "Service not found"

            });
        }


        res.json({

            message: "Service deleted successfully"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to delete service"

        });
    }
};


module.exports = {

    getServices,

    createService,

    updateService,

    deleteService

};