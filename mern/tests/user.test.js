const { getUser } = require("../controllers/userController");
const User = require("../models/userModel");
const {decodeJWT, generateToken} = require("../middleware/authMiddleware")


describe("getUser function", () => {
  let req, res;
  const userData = {
    _id: "user_id",
    email: "test@example.com",
    password: "password",
  };
  const token = "valid_token";
  const decodedToken = { id: "user_id" };

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return user data for a valid token", async () => {
    // Mock the decodeJWT and User.find functions
    decodeJWT.mockReturnValue(decodedToken);
    User.find = jest.fn().mockResolvedValue([userData]);

    await getUser({ headers: { authorization: `Bearer ${token}` } }, res);

    expect(decodeJWT).toHaveBeenCalledWith(req, res);
    expect(User.find).toHaveBeenCalledWith({ _id: decodedToken.id });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([userData]);
  });

  test("should return an error for an invalid token", async () => {
    const token = "invalid_token";
    const error = new Error("Invalid token");

    // Mock the decodeJWT function to throw an error
    decodeJWT.mockImplementation(() => {
      throw error;
    });

    await getUser({ headers: { authorization: `Bearer ${token}` } }, res);

    expect(decodeJWT).toHaveBeenCalledWith(req, res);
    expect(console.error).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith("Invalid token");
  });

  test("should return an error when an error occurs", async () => {
    const error = new Error("Database error");

    // Mock the decodeJWT and User.find functions to throw an error
    decodeJWT.mockReturnValue({ id: "user_id" });
    User.find = jest.fn().mockRejectedValue(error);

    await getUser({ headers: { authorization: `Bearer ${token}` } }, res);

    expect(decodeJWT).toHaveBeenCalledWith(req, res);
    expect(User.find).toHaveBeenCalledWith({ _id: decodedToken.id });
    expect(console.error).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Database error");
  });
});
