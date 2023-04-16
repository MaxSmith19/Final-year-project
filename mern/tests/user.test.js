const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const { getUser, registerUser, changePassword, loginUser, updateUser, deleteUser } = require('../controllers/userController');

const User = require('../models/userModel');
const { generateToken } = require('../middleware/authMiddleware');

jest.mock('../middleware/authMiddleware');

describe('POST /api/Users/login/', () => {
  const user = {
    businessName: 'Business',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password',
  };

  beforeAll(async () => {
    await mongoose.connect("mongodb+srv://root:root@cluster0.w3jh7u7.mongodb.net/BHUB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.create(user);

  });

  afterEach(async () => {
    await User.deleteOne({ email: user.email });
  });

  it('should insert the test user into the database', async () => {
    const insertedUser = await User.findOne({ email: user.email });
    expect(insertedUser).toBeDefined();
    expect(insertedUser.businessName).toEqual(user.businessName);
    expect(insertedUser.email).toEqual(user.email);
  });

  it('should return a token for a valid login', async () => {
    const req = {
      body: {
        email: user.email,
        password: user.password
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      _id: expect.any(String),
      token: expect.any(String),
      isAdmin: false,
    });
  });

  it('should return an error for an invalid password', async () => {
    const req = {
      body: {
        email: user.email,
        password: "user.password"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Password is incorrect'
    });
  });

});
