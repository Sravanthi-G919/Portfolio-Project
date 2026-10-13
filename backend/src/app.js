const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const aboutRoutes = require("./routes/aboutRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const projectsRoutes = require("./routes/projectRoutes");
const blogRoutes = require("./routes/blogRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const contactRoutes = require("./routes/contactRoutes");

const authenticateToken =
    require("./middleware/authMiddleware");

const app = express();


// ===============================
// Middleware
// ===============================

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));


// ===============================
// Authentication
// ===============================

app.use("/auth", authRoutes);


// ===============================
// About
// GET = Public
// PUT = Protected inside route
// ===============================

app.use("/about", aboutRoutes);


// ===============================
// Skills
// GET = Public
// POST/PUT/DELETE = Protected inside route
// ===============================

app.use("/skills", skillsRoutes);


// ===============================
// Projects
// GET = Public
// POST/PUT/DELETE = Protected inside route
// ===============================

app.use("/projects", projectsRoutes);


// ===============================
// Blogs
// GET = Public
// POST/PUT/DELETE = Protected inside route
// ===============================

app.use("/blogs", blogRoutes);


// ===============================
// Experience
// GET = Public
// POST/PUT/DELETE = Protected inside route
// ===============================

app.use("/experience", experienceRoutes);


// ===============================
// Testimonials
// GET = Public
// POST/PUT/DELETE = Protected
// ===============================

app.use(
    "/testimonials",
    authenticateToken,
    testimonialRoutes
);


// ===============================
// Services
// GET = Public
// POST/PUT/DELETE = Protected
// ===============================

app.use(
    "/services",
    authenticateToken,
    serviceRoutes
);


// ===============================
// Media Upload
// Protected for Admin
// ===============================

app.use(
    "/upload",
    authenticateToken,
    uploadRoutes
);


// ===============================
// Contact
// Public
// ===============================

app.use("/contact", contactRoutes);


// ===============================
// Home / Health Check
// ===============================

app.get("/", (req, res) => {
    res.json({
        message: "Portfolio CMS Backend is running"
    });
});


// ===============================
// Create Default Admin
// ===============================

const createDefaultAdmin = async () => {
    try {

        const username =
            process.env.ADMIN_USERNAME;

        const password =
            process.env.ADMIN_PASSWORD;


        if (!username || !password) {

            console.log(
                "Admin credentials not configured."
            );

            return;
        }


        const existingUser =
            await pool.query(
                "SELECT id FROM users WHERE username = $1",
                [username]
            );


        if (existingUser.rows.length > 0) {

            console.log(
                "Admin user already exists."
            );

            return;
        }


        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        await pool.query(
            `INSERT INTO users
            (username, password)
            VALUES ($1, $2)`,
            [
                username,
                hashedPassword
            ]
        );


        console.log(
            "Default admin user created."
        );

    } catch (error) {

        console.error(
            "Failed to create admin user:",
            error
        );

    }
};


// ===============================
// Database Connection
// ===============================

pool.query(
    "SELECT NOW()",
    async (err) => {

        if (err) {

            console.error(
                "Database connection failed:",
                err
            );

        } else {

            console.log(
                "Database connected successfully"
            );

            await createDefaultAdmin();

        }

    }
);


// ===============================
// Start Server
// ===============================

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    () => {

        console.log(
            `Server running on http://localhost:${PORT}`
        );

    }
);