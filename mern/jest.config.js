module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironmentVariables: {
    MONGO_URI: 'mongodb+srv://root:root@cluster0.w3jh7u7.mongodb.net/BHUB',
    JWT_SECRET: 'Ur7JXTBPflXChwqsiN0R',
    JWT_EXPIRES: '30d'
  }
};
