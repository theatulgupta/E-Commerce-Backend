import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createAccount = asyncHandler(async (req, res) => {
    const userData = req.body;
    const user = new User(userData);
    await user.save();

    // return response
    return res
        .status(202)
        .json(new ApiResponse(200, user, "User registered successfully"))
});

export { createAccount };