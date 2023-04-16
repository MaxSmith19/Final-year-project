const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginUser } = require("../controllers/userController");
const User = require("../models/user");

jest.mock("../models/user");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("loginUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should login user with correct email and password", async () => {
    const email = "test@example.com";
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      _id: "user_id",
      email,
      password: hashedPassword,
      isAdmin: false,
    };
    User.findOne.mockResolvedValue(user);
    const req = {
      body: { email, password },
    };
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    await loginUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      _id: user._id,
      token,
      isAdmin: user.isAdmin,
    });
  });

  test("should return 401 error for incorrect password", async () => {
    const email = "test@example.com";
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      _id: "user_id",
      email,
      password: hashedPassword,
      isAdmin: false,
    };
    User.findOne.mockResolvedValue(user);
    const req = {
      body: { email, password: "wrong_password" },
    };

    await loginUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "wrong_password",
      hashedPassword
    );
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith("Password is incorrect");
  });

  test("should return 401 error for user not found", async () => {
    const email = "test@example.com";
    const password = "password123";
    User.findOne.mockResolvedValue(null);
    const req = {
      body: { email, password },
    };

    await loginUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith("User not found");
  });

  test("should return 500 error for server error", async () => {
    const email = "test@example.com";
    const password = "password123";
    User.findOne.mockRejectedValue(new Error("test error"));
    const req = {
      body: { email, password },
    };

    await loginUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Server error");
  });
});
