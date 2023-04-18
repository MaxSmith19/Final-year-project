const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const { corsMiddleware } = require("./middleware/corsMiddleware");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5050;
const { connectDB } = require("./config/db");
const cookieParser = require("cookie-parser");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded(false));
app.use(cors({ 
  origin: ['http://82.20.49.101', 'http://localhost:3000', '*'], 
  credentials: true 
}));

app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use('/api/Users', require("./routes/userRoutes.js"));
app.use('/api/Ledgers', require('./routes/ledgersRoutes.js'));
app.use('/api/Socials', require('./routes/socialMediaRoutes.js'));
app.use('/api/Inventory', require('./routes/inventoryRoutes.js'));
app.use('/api/Tickets', require('./routes/ticketRoutes.js'));

app.use(errorHandler);

let server;
if (process.env.NODE_ENV !== 'production') {
  const randomPort = Math.floor(Math.random() * 10000) + 3000;
  server = app.listen(randomPort, () => {
    console.log(`Server started on port ${randomPort}`);
  });
  //because of how jest works, we need to generate a random port between
  //3000 and 13000 to avoid collisions with test suites
} else {
  server = http.createServer(app);
  server.listen(port, () => console.log(`Server started on port ${port}`));
}

module.exports = server;
