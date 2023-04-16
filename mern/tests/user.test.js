const { User } = require('../models/userModel')
const { registerUser } = require('../controllers/userController')

jest.mock('../models/user')

describe('registerUser', async () => {
  let req, res

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
    jest.resetAllMocks()
  })

  it('registers a new user and returns a token', async () => {
    User.findOne.mockResolvedValue(null)
    User.create.mockResolvedValue({
      _id: 'user123'
    })
    const expectedToken = 'mocked_token'

    const generateTokenMock = jest.fn(() => expectedToken)

    const bcryptMock = {
      hash: jest.fn(() => 'mocked_hash')
    }

    const validEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    const originalValidEmail = validEmail.test
    const originalValidPassword = validPassword.test

    validEmail.test = jest.fn(() => true)
    validPassword.test = jest.fn(() => true)

    const originalBcryptHash = bcrypt.hash
    bcrypt.hash = jest.fn(() => 'mocked_hash')

    const originalGenerateToken = generateToken
    generateToken = generateTokenMock

    await registerUser(req, res)

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email })
    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10)
    expect(User.create).toHaveBeenCalledWith({
      email: req.body.email,
      password: 'mocked_hash',
      businessName: req.body.businessName
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      token: expectedToken
    })

    validEmail.test = originalValidEmail
    validPassword.test = originalValidPassword
    bcrypt.hash = originalBcryptHash
    generateToken = originalGenerateToken
  })

  it('returns an error if the user already exists', async () => {
    User.findOne.mockResolvedValue({
      _id: 'existing_user'
    })

    await registerUser(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith('User already exists')
  })
})
