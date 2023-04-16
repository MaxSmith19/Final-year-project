const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const logsDirectory = path.join(__dirname, "../logs");
const logFilePath = path.join(logsDirectory, "MongoErrors.log");

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
  console.log(`Logs directory created: ${logsDirectory}`);
}

const { errorHandler } = require("../middleware/errorMiddleware");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://root:root@cluster0.w3jh7u7.mongodb.net/BHUB");
    console.log(`CONNECTED TO MONGO @ ${connect.connection.host}`.underline);

    // Listen for errors on the MongoDB connection
    mongoose.connection.on("error", (error) => {
      // if an error does occur, then format the error message and sent it to "MongoLogs.log"
      const errorMessage = `${new Date().toISOString()} - MongoDB Error: ${error.message}\n`;
      fs.appendFile(logFilePath, errorMessage, (err) => {
        if (err) {
          console.error(`Error writing to log file: ${err}`);
        }
      });
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDB, mongoose };
