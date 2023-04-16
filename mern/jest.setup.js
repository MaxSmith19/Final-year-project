const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect("mongodb+srv://root:root@cluster0.w3jh7u7.mongodb.net/BHUB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});
