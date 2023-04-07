const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`CONNECTED TO MONGO @ ${connect.connection.host}`.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDB, mongoose };
