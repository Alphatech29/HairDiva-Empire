const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const dotenv = require("dotenv");
const logger = require('./middleWare/logger');
const generalRoute = require("./routes/general");
const {
  securityHeaders,
  apiLimiter,
  bodyParser,
  validateRequest,
  enforceHTTPS,
} = require("./middleWare/apiSecurity");

dotenv.config({ silent: false });

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Trust Proxy =====
app.set("trust proxy", process.env.NODE_ENV === "production" ? 1 : 0);

// ===== Security & Parsing =====
app.use(securityHeaders);
app.use(bodyParser);

// ===== API Middleware & Routes =====
app.use("/api", apiLimiter);
app.use("/api", validateRequest);
app.use("/api", generalRoute);

// ===== Serve Frontend SPA =====
const staticPath = path.join(__dirname, "views", "dist");

if (!fs.existsSync(staticPath)) {
  logger.warn("Frontend static files not found! Run 'npm run build' in frontend.");
} else {
  app.use(express.static(staticPath));

  app.get(/^(?!\/api).*/, (req, res) => {
    const requestedFile = path.join(staticPath, req.path);
    if (fs.existsSync(requestedFile) && fs.statSync(requestedFile).isFile()) {
      return res.sendFile(requestedFile);
    }
    const indexPath = path.join(staticPath, "index.html");
    return fs.existsSync(indexPath)
      ? res.sendFile(indexPath)
      : res.status(404).send("Error: Application entry point could not be detected.");
  });
}

// ===== Global Error Handler =====
app.use((err, req, res, next) => {
  logger.error(err.message, {
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

// ===== Uncaught Exceptions & Unhandled Rejections =====
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", { message: err.message, stack: err.stack });
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection:", { reason, promise });
});

// ===== Start Server =====
const startServer = () => {
  if (process.env.NODE_ENV === "production") {
    const keyPath = "server.key";
    const certPath = "server.cert";

    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      const options = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      };
      https.createServer(options, app).listen(PORT, () => {
        console.log(`Production HTTPS server running on port ${PORT}`);
      });
      app.use(enforceHTTPS);
    } else {
      logger.error("SSL certs not found! Cannot start HTTPS server in production.");
      process.exit(1);
    }
  } else {
    // Development HTTPS fallback
    const devKey = path.join(__dirname, "certs", "key.pem");
    const devCert = path.join(__dirname, "certs", "cert.pem");

    if (fs.existsSync(devKey) && fs.existsSync(devCert)) {
      const options = {
        key: fs.readFileSync(devKey),
        cert: fs.readFileSync(devCert),
      };
      https.createServer(options, app).listen(PORT, () => {
        console.log(`Server conneted`);
      });
    } else {
      app.listen(PORT, () => {
       console.log(`Server conneted`);
      });
      console.log("Dev SSL certs not found. HTTP server running instead of HTTPS.");
    }
  }
};

startServer();
