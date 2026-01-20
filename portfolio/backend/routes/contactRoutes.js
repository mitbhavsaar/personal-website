const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // Append to Google Sheet
    const { appendToSheet } = require("../utils/googleSheets");
    await appendToSheet({ name, email, message });

    res.status(201).json({ success: true, msg: "Message saved!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
