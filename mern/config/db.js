const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://root:root@cluster0.w3jh7u7.mongodb.net/BHUB");
    console.log(`CONNECTED TO MONGO @ ${connect.connection.host}`.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDB, mongoose };
