const pool = require("../config/db");
const fs = require("fs");
const path = require("path");

// ==================== UPLOAD IMAGE ====================

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No image uploaded"
            });
        }

        const filename = req.file.filename;
        const file_url = `/uploads/${filename}`;

        const result = await pool.query(
            `INSERT INTO media
            (filename, file_url)
            VALUES ($1, $2)
            RETURNING *`,
            [filename, file_url]
        );

        res.status(201).json({
            message: "Image uploaded successfully",
            media: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to upload image"
        });
    }
};


// ==================== GET ALL MEDIA ====================

const getMedia = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM media ORDER BY id DESC"
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get media"
        });
    }
};


// ==================== DELETE MEDIA ====================

const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM media WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Media not found"
            });
        }

        const media = result.rows[0];

        const filePath = path.join(
            __dirname,
            "../../uploads",
            media.filename
        );

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.json({
            message: "Media deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete media"
        });
    }
};


module.exports = {
    uploadImage,
    getMedia,
    deleteMedia
};