const express = require("express");

const {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill
} = require("../controllers/skillsController");

const authenticateToken =
    require("../middleware/authMiddleware");

const router = express.Router();


// Public: visitors can view skills
router.get("/", getSkills);


// Protected: only admin can manage skills
router.post(
    "/",
    authenticateToken,
    createSkill
);

router.put(
    "/:id",
    authenticateToken,
    updateSkill
);

router.delete(
    "/:id",
    authenticateToken,
    deleteSkill
);

module.exports = router;