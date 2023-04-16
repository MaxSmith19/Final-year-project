module.exports = {
    // ...
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.js'],
    // ...
    testEnvironmentVariables: {
      MONGO_URI: 'mongodb://localhost/my-test-db'
    }
  };
  