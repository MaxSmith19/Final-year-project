const fs = require("fs");
const path = require("path");

const logsDirectory = path.join(__dirname, "../logs");
const logFilePath = path.join(logsDirectory, "error.log");
// Create the logs directory if it doesn't exist
if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
    console.log(`Logs directory created: ${logsDirectory}`);
  }
  

  const errorHandler = (err, req, res, next) => {   
    if (res.headersSent) {
      return next(err);
    }
  
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    // Get the client's IP address
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
    // Create the error log message with the client's IP address
    const errorMessage = `${new Date().toISOString()} - ${clientIp} - ${err.message}\n`;
  
    // Append the error message to the error log file
    fs.appendFile(
      path.join(logsDirectory, "error.log"),
      errorMessage,
      (error) => {
        if (error) {
          console.error(`Error writing to log file: ${error}`);
        }
      }
    );
    fs.appendFile(logFilePath, errorMessage, (err) => {
      if (err) {
        console.error(`Error writing to log file: ${err}`);
      }
    });
    res.status(statusCode);
  
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
      //if it is in production, then no stack will be returned, just the error.
    });
  };
  
  module.exports = {
    errorHandler,
  };
  