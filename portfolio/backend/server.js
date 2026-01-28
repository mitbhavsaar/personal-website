const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const path = require("path");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Serving Static Files from React build
app.use(express.static(path.join(__dirname, "../dist")));

app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);

// Catch-all route to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
