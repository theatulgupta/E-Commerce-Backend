import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from '../models/category.model.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { mongoose } from 'mongoose';

const createCategory = asyncHandler(async (req, res) => {
    // Extract category data from the request body
    const categoryData = req.body;

    // Check if required category data is provided
    if (!categoryData || !categoryData.title) {
        throw new ApiError(400, "Category title is required");
    }

    // Check if a category with the same title already exists
    const existingCategory = await Category.findOne({ title: categoryData.title });

    // Throw error if category already exists
    if (existingCategory) {
        throw new ApiError(400, "Category with this title already exists");
    }

    // Create a new category using the provided data
    const category = await Category.create(categoryData);

    // Save the new category to the database
    await category.save();

    // Return a success response with the created category details
    return res
        .status(201)
        .json(new ApiResponse(200, category, "Category added successfully "));
});

const fetchCategory = asyncHandler(async (req, res) => {
    // Extract category id from the request params
    const { id } = req.params;

    // Check if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid category id");
    }

    // Fetch category from the database
    const category = await Category.findById(id);

    // Check if category exists
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    // Return a success response with the fetched category
    return res
        .status(200)
        .json(new ApiResponse(200, category, "Category fetched successfully"));
});

const fetchAllCategories = asyncHandler(async (req, res) => {
    // Fetch all categories from the database
    const categories = await Category.find();

    // Check if there are no categories found
    if (!categories || categories.length === 0) {
        throw new ApiError(404, "No categories found");
    }

    // Return a success response with the fetched categories
    return res
        .status(200)
        .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

export { createCategory, fetchCategory, fetchAllCategories };