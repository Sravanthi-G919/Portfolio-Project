const express = require("express");

const {
    login,
    refreshToken
} = require("../controllers/authController");


const router = express.Router();


// ==================== LOGIN ====================

router.post(
    "/login",
    login
);


// ==================== REFRESH ====================

router.post(
    "/refresh",
    refreshToken
);


module.exports = router;