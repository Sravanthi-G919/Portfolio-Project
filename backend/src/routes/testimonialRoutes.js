const express = require("express");

const {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require("../controllers/testimonialController");


const router = express.Router();


// GET all testimonials
router.get("/", getTestimonials);


// CREATE testimonial
router.post("/", createTestimonial);


// UPDATE testimonial
router.put("/:id", updateTestimonial);


// DELETE testimonial
router.delete("/:id", deleteTestimonial);


module.exports = router;