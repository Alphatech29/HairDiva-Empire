const express = require("express");
const path = require("path");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve Client App (React/Vue build)
const staticPath = path.join(__dirname, "views", "dist");
app.use(express.static(staticPath));

// Catch-all route for SPA (React, Vue, etc.)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"), (err) => {
    if (err) {
      console.error("Failed to serve index.html:", err);
      res.status(500).send("Internal server error.");
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server Connected Successfully`);
});
