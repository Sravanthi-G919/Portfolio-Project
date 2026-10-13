const express = require("express");

const {
    getServices,
    createService,
    updateService,
    deleteService
} = require("../controllers/serviceController");


const router = express.Router();


// GET all services
router.get("/", getServices);


// CREATE service
router.post("/", createService);


// UPDATE service
router.put("/:id", updateService);


// DELETE service
router.delete("/:id", deleteService);


module.exports = router;