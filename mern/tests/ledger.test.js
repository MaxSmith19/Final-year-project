const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const { generateToken, decodeJWT } = require('../middleware/authMiddleware');
const Ledger = require('../models/ledgersModel');
const User = require('../models/userModel');
const { createLedger, updateLedger, getLedger, deleteLedger } = require('../controllers/ledgersController');
const { loginUser } = require('../controllers/userController');
const bcrypt = require('bcrypt');
jest.mock('../middleware/authMiddleware');

beforeAll(async () => {
  await Ledger.deleteMany({})
  //delete everything in Ledgers collection
});

describe('POST /api/Ledgers', () => {
  let authToken;
  let ledger;
  const user = {
    businessName: 'Business',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password'
  };
  const ledgerData = {
    ledgerName: 'Test Ledger',
    ledgerData: {},
    balance: 100,
  };

  beforeEach(async () => {
    await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 10)
    });

    generateToken.mockReturnValue('fake-token');
    decodeJWT.mockReturnValue({ id: 'fake-user-id' });

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
    ledger = await Ledger.create({
      ...ledgerData,
      userID: decodeJWT({ headers: { authorization: authToken } })?.id,
    });
  });

  afterEach(async () => {
    await User.deleteOne({ email: user.email });
  });
 
  it('should return all the ledgers of a user', async () => {
    const userId = 'fake-user-id';

  // Create a ledger for the user
    const ledger = new Ledger({
      userID: userId,
      ledgerName: ledgerData.ledgerName,
      ledgerData: ledgerData.ledgerData,
      balance: ledgerData.balance
    });
    await ledger.save();

    const req = {
      body:{
        ledgerName: undefined
      },
      headers: {
        authorization: authToken,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getLedger(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    // Check if all the ledgers were retrieved
    const ledgers = res.json.mock.calls[0][0];
    console.log(ledgers)
    expect(ledgers[0].ledgerName).toEqual(ledgerData.ledgerName);
    expect(ledgers[0].userID).toEqual('fake-user-id');
    expect(ledgers[0].balance).toEqual(ledgerData.balance);
    await Ledger.findOneAndDelete({ledgerName: ledgerData.ledgerName});
  });

  it('should create a new ledger', async () => {

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
    expect(ledger.userID).toEqual('fake-user-id');
    expect(ledger.balance).toEqual(ledgerData.balance);
    await Ledger.findOneAndDelete({ledgerName: ledgerData.ledgerName});
  });
  it('should update the balance of an existing ledger', async () => {
    const updatedBalance = 200;
    
    const req = {
      body: {
        _id: ledger._id,
        ledgerData: ledger.ledgerData,
        balance: updatedBalance,
      },
      headers: {
        authorization: 'Bearer fake-token',
      },
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    await updateLedger(req, res);
    
    expect(res.status).toHaveBeenCalledWith(201);
    
    // Check if the ledger was updated in the database
    const updatedLedger = await Ledger.findById(ledger._id);
    expect(updatedLedger).not.toBeNull();
    expect(updatedLedger.balance).toEqual(updatedBalance);
  });
  
  
  it('should update the name, data, and balance of an existing ledger', async () => {
    // Create a new ledger
    const ledgerData = {
      ledgerName: 'Test Ledger',
      ledgerData: {},
      balance: 100,
    };
    
    const req1 = {
      body: ledgerData,
      headers: {
        authorization: authToken,
      },
    };
  
    const res1 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await createLedger(req1, res1);
    expect(res1.status).toHaveBeenCalledWith(201);
  
    // Get the _id of the newly created ledger
    const ledgerId = res1.json.mock.calls[0][0]._id;
  
    // Update the ledger's name, data, and balance
    const updatedLedgerData = {
      ledgerName: 'Updated Ledger Name',
      ledgerData: {},
      balance: 200,
    };
  
    const req2 = {
      body: {
        _id: ledgerId,
        ledgerName: updatedLedgerData.ledgerName,
        ledgerData: updatedLedgerData.ledgerData,
        balance: updatedLedgerData.balance,
      },
      headers: {
        authorization: authToken,
      },
    };
  
    const res2 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await updateLedger(req2, res2);
    expect(res2.status).toHaveBeenCalledWith(201);
  
    // Get the updated ledger from the database
    const updatedLedger = await Ledger.findById(ledgerId);
  
    expect(updatedLedger).not.toBeNull();
    expect(updatedLedger.ledgerName).toEqual(updatedLedgerData.ledgerName);
    expect(updatedLedger.ledgerData).toEqual(updatedLedgerData.ledgerData);
    expect(updatedLedger.balance).toEqual(updatedLedgerData.balance);
  
    // Delete the test ledger
    await Ledger.findByIdAndDelete(ledgerId);
  });
  it('should delete a ledger', async () => {
    const req = {
      body: {
        _id: ledger._id,
      },
      headers: {
        authorization: authToken,
      },
    };
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await deleteLedger(req, res);
  
    expect(res.status).toHaveBeenCalledWith(201);
  
    // Check if the ledger was deleted from the database
    const deletedLedger = await Ledger.findById(ledger._id);
    expect(deletedLedger).toBeNull();
  });
  
})
