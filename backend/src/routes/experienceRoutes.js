const express = require("express");

const {
    getExperience,
    createExperience,
    updateExperience,
    deleteExperience
} = require("../controllers/experienceController");

const authenticateToken =
    require("../middleware/authMiddleware");

const router = express.Router();


// Public: visitors can view experience
router.get("/", getExperience);


// Protected: only admin can manage experience
router.post(
    "/",
    authenticateToken,
    createExperience
);

router.put(
    "/:id",
    authenticateToken,
    updateExperience
);

router.delete(
    "/:id",
    authenticateToken,
    deleteExperience
);

module.exports = router;