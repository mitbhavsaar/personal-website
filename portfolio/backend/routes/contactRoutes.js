const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Attempt to save to MongoDB (Graceful failure)
    try {
      const newMessage = new Contact({ name, email, message });
      await newMessage.save();
      console.log("✅ Saved to MongoDB");
    } catch (dbErr) {
      console.error("❌ MongoDB Save Error:", dbErr.message);
      // We continue because we want the Google Sheet to work even if DB is down
    }

    // Append to Google Sheet (Async)
    try {
      const { appendToSheet } = require("../utils/googleSheets");
      appendToSheet({ name, email, message }); // No await here
    } catch (sheetErr) {
      console.error("❌ Google Sheets Error:", sheetErr.message);
    }

    res.status(201).json({ success: true, msg: "Message processed!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
