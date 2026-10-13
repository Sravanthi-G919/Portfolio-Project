const express = require("express");

const {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} = require("../controllers/projectsController");

const authenticateToken =
    require("../middleware/authMiddleware");

const router = express.Router();


// Public: visitors can view projects
router.get("/", getProjects);


// Protected: only admin can manage projects
router.post(
    "/",
    authenticateToken,
    createProject
);

router.put(
    "/:id",
    authenticateToken,
    updateProject
);

router.delete(
    "/:id",
    authenticateToken,
    deleteProject
);

module.exports = router;