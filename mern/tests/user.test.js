const response = require("supertest")
const User = require("../models/UserModel");
const {
    getUser,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
  } = require('../controllers/UserController');


 const {decodeJWT, generateToken} = require("../middleware/authMiddleware")
describe("Create (register) user", () => {
    let req,res
    beforeEach(() => {
        req = {
            body: {
              email: 'test@example.com',
              password: 'password123',
              businessName: 'Test Business'
            }
          }
          res = {
            status: jest.fn(() => res),
            json: jest.fn()
          }
    })
    afterEach(() => {

    })

})
 test("generate JWT Token", () => {
    

})