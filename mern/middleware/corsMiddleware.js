const cors = require("cors");

const corsMiddleware = cors({
  origin: ["http://localhost:3000"], // Replace with the actual origin(s) you want to allow
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "X-Requested-With", "Authorization"],
  credentials: true, // Allow cookies to be sent with the request (if needed)
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
});

module.exports = {
  corsMiddleware,
};
