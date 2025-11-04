const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const uploadDir = "uploads/";

const { Properties } = require("../models");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const listOfProperties = await Properties.findAll();
    res.json(listOfProperties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const propertyData = { ...req.body };

    if (req.file) {
      propertyData.image = req.file.filename;
    }

    const property = await Properties.create(propertyData);
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create property" });
  }
});

router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const property = await Properties.findByPk(id);
    res.json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cant find property" });
  }
});

router.get("/type/:type", async (req, res) => {
  try {
    const type = req.params.type;
    if (!type.trim()) return res.status(400).json({ error: "type parameter is required" });

    const property = await Properties.findPropertiesByType(type);
    res.json(property);
  } catch (error) {
    console.error("Search by type error:", error);
    res.status(500).json({ error: "Failed to search properties by type" });
  }
});

module.exports = router;
