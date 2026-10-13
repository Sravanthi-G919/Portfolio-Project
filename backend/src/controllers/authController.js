const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ==================== CREATE ACCESS TOKEN ====================

const createAccessToken = (user) => {

    return jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );
};


// ==================== CREATE REFRESH TOKEN ====================

const createRefreshToken = (user) => {

    return jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "7d"
        }
    );
};


// ==================== LOGIN ====================

const login = async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;


        if (!username || !password) {

            return res.status(400).json({
                message: "Username and password are required"
            });
        }


        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );


        if (result.rows.length === 0) {

            return res.status(401).json({
                message: "Invalid username or password"
            });
        }


        const user = result.rows[0];


        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({
                message: "Invalid username or password"
            });
        }


        const accessToken =
            createAccessToken(user);


        const refreshToken =
            createRefreshToken(user);


        res.json({

            message: "Login successful",

            accessToken: accessToken,

            refreshToken: refreshToken,

            user: {
                id: user.id,
                username: user.username
            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Login failed"
        });
    }
};


// ==================== REFRESH TOKEN ====================

const refreshToken = async (req, res) => {

    try {

        const {
            refreshToken
        } = req.body;


        if (!refreshToken) {

            return res.status(401).json({
                message: "Refresh token is required"
            });
        }


        const decoded =
            jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET
            );


        const result = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [decoded.id]
        );


        if (result.rows.length === 0) {

            return res.status(401).json({
                message: "User not found"
            });
        }


        const user = result.rows[0];


        const newAccessToken =
            createAccessToken(user);


        res.json({

            message: "Access token refreshed",

            accessToken: newAccessToken

        });

    } catch (error) {

        console.error(error);

        res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }
};


module.exports = {
    login,
    refreshToken
};