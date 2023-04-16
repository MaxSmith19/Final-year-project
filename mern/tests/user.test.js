const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { decodeJWT } = require("../middleware/authMiddleware");
const { getUser } = require("../controllers/userController");

// Mock the req and res objects
const req = {};
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

describe("getUser function", () => {
  // Test the case where a valid token is provided
  test("should return user data for a valid token", async () => {
    const token = "valid_token";
    const decodedToken = { id: "user_id" };
    const userData = { name: "John Doe", email: "johndoe@example.com" };

    // Mock the decodeJWT and User.find functions
    decodeJWT.mockReturnValue(decodedToken);
    User.find.mockResolvedValue([userData]);

    await getUser({ headers: { authorization: `Bearer ${token}` } }, res);

    // Check that the status and json methods were called correctly
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([userData]);
  });

  // Test the case where an invalid token is provided
  test("should return an error for an invalid token", async () => {
    const token = "invalid_token";
    const error = new Error("Invalid token");

    // Mock the decodeJWT function to throw an error
    decodeJWT.mockImplementation(() => {
      throw error;
    });

    await getUser({ headers: { authorization: `Bearer ${token}` } }, res);

    // Check that the status and json methods were called correctly
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });
  });

  // Test the case where an error occurs when retrieving user data
  test("should return an error when an error occurs", async () => {
    const token = "valid_token";
    const error = new Error("Database error");

    // Mock the decodeJWT and User.find functions to throw an error
    decodeJWT.mockReturnValue({ id: "user_id" });
    User.find.mockRejectedValue(error);

    await getUser({ headers: { authorization: `Bearer ${token}` } }, res);

    // Check that the status and json methods were called correctly
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });
  });
});
