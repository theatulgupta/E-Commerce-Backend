import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

const createAccount = asyncHandler(async (req, res) => {
    // Extract user data from the request body
    const userData = req.body;

    // Check if required user data is provided
    if (!userData.email || !userData.password) {
        throw new ApiError(400, "Email and password are required");
    }

    // Check in the database if the user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    // Create a new User instance with the provided data
    const newUser = new User(userData);

    // Save the new user to the database
    await newUser.save();

    // Get the user details from database without password field
    const user = await User.findById(newUser._id).select("-password");

    // Return a successful response with the user details
    return res.status(202).json(new ApiResponse(200, user, "User registered successfully"));
});

const signIn = asyncHandler(async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // Find user by email in the database
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    // Check if the password is valid
    if (!isPasswordMatch) {
        throw new ApiError(400, "Invalid password");
    }

    // Remove password field from user object
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Return a successful response with the user details
    return res.status(200).json(new ApiResponse(200, userWithoutPassword, "User logged in successfully"));
});

export { createAccount, signIn };