const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const { loginUser, registerUser, updateUser } = require('../controllers/userController');
const bcrypt = require("bcrypt");

const User = require('../models/userModel');
const { generateToken } = require('../middleware/authMiddleware');

jest.mock('../middleware/authMiddleware');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});
//LOGIN TEST SUITE
describe('POST /api/Users/login/', () => {
  const user = {
    businessName: 'Business',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password'
  };



  beforeEach(async () => {
    await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 10)
    });
    //add the user but with a hashed password to match the password
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
  });
  
  it('should return an error for an invalid password', async () => {
    const req = {
      body: {
        email: user.email,
        password: 'invalidpassword'
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
  //RESGISTER TEST SUITE
  describe('POST /api/Users/register/', () => {
    const user = {
      businessName: 'Business',
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password1'
    };

  
    afterEach(async () => {
      await User.deleteOne({ email: user.email });
    });
  
    it('should insert the test user into the database', async () => {
      const req = {
        body: user,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await registerUser(req, res);
  
      const insertedUser = await User.findOne({ email: user.email });
      expect(insertedUser).toBeDefined();
      expect(insertedUser.businessName).toEqual(user.businessName);
      expect(insertedUser.email).toEqual(user.email);
    });
  
    it('should return a token for a registered user', async () => {
      const req = {
        body: user,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        token: expect.any(String),
      });
    });
  
    it('should return an error for an invalid email format', async () => {
      const req = {
        body: {
          ...user,
          email: 'invalid-email'
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("Email does not meet the requirements");
    });
  
    it('should return an error for an invalid password format', async () => {
      const req = {
        body: {
          ...user,
          password: 'short'
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("Password does not meet the requirements");
    });
  
    it('should return an error for an already registered email', async () => {
      const req = {
        body: user,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("User already exists");
    });
  });
  //UPDATE TEST SUITE
  
  describe('PUT /api/Users/update/', () => {
    const user = {
      businessName: 'Business',
      name: 'Test User',
      email: 'test@example.com',
      password: 'password'
    };
  
    let authToken;
  
    beforeEach(async () => {
      await User.create({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      });
  
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
      //calls the login user as it returns the token we need to update the user data
  
      const token = res.json.mock.calls[0][0].token;
      authToken = `Bearer ${token}`;
    });
  
    afterEach(async () => {
      await User.deleteOne({ email: user.email });
    });
  
    it('should update the user successfully', async () => {
      const updatedUser = {
        businessName: 'New Business Name',
        name: 'BusinessLogo',
      };
  
      const req = {
        headers: {
          authorization: authToken,
        },
        body: updatedUser
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await updateUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
  
      const userInDB = await User.findOne({ email: user.email });
      expect(userInDB.businessName).toBe(updatedUser.businessName);
      expect(userInDB.businessLogo).toBe(updatedUser.businessLogo);
    });
  
    it('should return an error if user is not authenticated', async () => {
      const updatedUser = {
        businessName: 'New Business Name',
        name: 'New Test User',
      };
  
      const req = {
        headers: {
          authorization: '',
        },
        body: updatedUser,
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await updateUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(401);
    });
  });
  
});  