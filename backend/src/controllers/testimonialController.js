const pool = require("../config/db");

// ==================== GET ALL TESTIMONIALS ====================

const getTestimonials = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM testimonials ORDER BY id DESC"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to get testimonials"
        });
    }
};


// ==================== CREATE TESTIMONIAL ====================

const createTestimonial = async (req, res) => {
    try {

        const {
            name,
            message,
            role
        } = req.body;


        if (!name || !message) {

            return res.status(400).json({
                message: "Name and message are required"
            });
        }


        const result = await pool.query(
            `INSERT INTO testimonials
            (name, message, role)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [
                name,
                message,
                role
            ]
        );


        res.status(201).json({

            message: "Testimonial created successfully",

            testimonial: result.rows[0]

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create testimonial"
        });
    }
};


// ==================== UPDATE TESTIMONIAL ====================

const updateTestimonial = async (req, res) => {

    try {

        const { id } = req.params;


        const {
            name,
            message,
            role
        } = req.body;


        const result = await pool.query(

            `UPDATE testimonials

            SET
                name = $1,
                message = $2,
                role = $3

            WHERE id = $4

            RETURNING *`,

            [
                name,
                message,
                role,
                id
            ]

        );


        if (result.rows.length === 0) {

            return res.status(404).json({

                message: "Testimonial not found"

            });
        }


        res.json({

            message: "Testimonial updated successfully",

            testimonial: result.rows[0]

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to update testimonial"

        });
    }
};


// ==================== DELETE TESTIMONIAL ====================

const deleteTestimonial = async (req, res) => {

    try {

        const { id } = req.params;


        const result = await pool.query(

            "DELETE FROM testimonials WHERE id = $1 RETURNING *",

            [id]

        );


        if (result.rows.length === 0) {

            return res.status(404).json({

                message: "Testimonial not found"

            });
        }


        res.json({

            message: "Testimonial deleted successfully"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to delete testimonial"

        });
    }
};


module.exports = {

    getTestimonials,

    createTestimonial,

    updateTestimonial,

    deleteTestimonial

};