const fs = require("fs");
const path = require("path");

const logsDirectory = path.join(__dirname, "../logs");
const logFilePath = path.join(logsDirectory, "error.log");

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
  console.log(`Logs directory created: ${logsDirectory}`);
}

// Append the error message to the log file


  

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Create the error log message
  const errorMessage = `${new Date().toISOString()} - ${err.message}\n`;

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
  });
};

module.exports = {
  errorHandler,
};
