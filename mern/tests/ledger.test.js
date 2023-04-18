const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const { decodeJWT } = require('../middleware/authMiddleware');
const Ledger = require('../models/ledgersModel');
const User = require('../models/userModel');
const { createLedger } = require('../controllers/ledgersController');
const { loginUser } = require('../controllers/userController');
const bcrypt = require('bcrypt');

describe('POST /api/Ledgers', () => {
  let authToken;
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

    const token = res.json.mock.calls[0][0].token;
    authToken = `Bearer ${token}`;
  });

  afterEach(async () => {
    await User.deleteOne({ email: user.email });
  });

  it('should create a new ledger', async () => {
    const ledgerData = {
      ledgerName: 'Test Ledger',
      balance: 100,
    };

    const req = {
      body: ledgerData,
      headers: {
        authorization: authToken,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createLedger(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

    // Check if the ledger was saved in the database
    const ledger = await Ledger.findOne({ ledgerName: ledgerData.ledgerName });
    expect(ledger).not.toBeNull();
    expect(ledger.ledgerName).toEqual(ledgerData.ledgerName);
    expect(ledger.userID).toEqual(decodeJWT(req).id);
    expect(ledger.balance).toEqual(ledgerData.balance);
    await Ledger.findOneAndDelete({ledgerName: ledgerData.ledgerName});
  });
  it('should update the ledger', async () => {

  })
});
