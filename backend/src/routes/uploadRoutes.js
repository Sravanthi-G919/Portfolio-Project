const express = require("express");
const multer = require("multer");

const {
    uploadImage,
    getMedia,
    deleteMedia
} = require("../controllers/uploadController");

const router = express.Router();


// ==================== MULTER STORAGE ====================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }

});


const upload = multer({
    storage: storage
});


// ==================== GET ALL MEDIA ====================

router.get("/", getMedia);


// ==================== UPLOAD IMAGE ====================

router.post(
    "/image",
    upload.single("image"),
    uploadImage
);


// ==================== DELETE MEDIA ====================

router.delete(
    "/:id",
    deleteMedia
);


module.exports = router;