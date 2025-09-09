const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const express = require("express");

const securityHeaders = helmet({ contentSecurityPolicy: false });

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: "Too many requests, try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const bodyParser = express.json({ limit: "10mb" });

function validateRequest(req, res, next) {
  if (
    req.method === "POST" &&
    !req.is("application/json") &&
    !req.is("multipart/form-data")
  ) {
    return res.status(400).json({ error: "Content-Type must be application/json or multipart/form-data" });
  }
  next();
}


function enforceHTTPS(req, res, next) {
  if (req.secure || req.headers["x-forwarded-proto"] === "https") {
    return next();
  }
  if (process.env.NODE_ENV === "production") {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
}

module.exports = { securityHeaders, apiLimiter, bodyParser, validateRequest, enforceHTTPS };
