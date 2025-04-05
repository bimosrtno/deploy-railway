require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.get ("/api/hello", (req, res) => res.send("Hello World!"));

module.exports = app;
