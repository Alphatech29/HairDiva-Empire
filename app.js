// server.js
const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const generalRoute = require("./routes/general");


dotenv.config({ quiet: false });


// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api", generalRoute);

// Serve Client App (React/Vue build)
const staticPath = path.join(__dirname, "views", "dist");
app.use(express.static(staticPath));

// Catch-all route for SPA (React/Vue/Angular)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"), (err) => {
    if (err) {
      console.error("Failed to serve index.html:", err);
      res.status(500).send("Internal server error.");
    }
  });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
