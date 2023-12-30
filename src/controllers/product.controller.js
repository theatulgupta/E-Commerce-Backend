import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Product } from '../models/product.model.js';
import { asyncHandler } from '../utils/asyncHandler.js'

const createProduct = asyncHandler(async (req, res) => {
    // Extract all data from the request body
    const productData = req.body;

    // Check if any data is provided in the request body
    if (!productData || Object.keys(productData).length === 0) {
        throw new ApiError(400, 'Product data is required for creation');
    }

    // Check if product with the same title already exists
    const existingProduct = await Product.findOne({ title: productData.title });

    // Throw error if product already exists
    if (existingProduct) {
        throw new ApiError(409, 'Product with the same title already exists');
    }

    // Create a new product using the provided data
    const newProduct = await Product.create(productData);

    // Save the new product to the database
    await newProduct.save();

    // Return a success response with the created product details
    return res
        .status(201)
        .json(new ApiResponse(200, newProduct, 'Product created successfully'));
});

const fetchAllProducts = asyncHandler(async (req, res) => {
    // Fetch all products from the database
    const products = await Product.find();

    // Check if any products were found
    if (!products || products.length === 0) {
        throw new ApiError(404, 'No products found');
    }

    // Return a success response with the fetched products
    return res
        .status(200)
        .json(new ApiResponse(200, products, 'Products fetched successfully'));
});

// API to fetch product based on category id
const fetchProductsByCategory = asyncHandler(async (req, res) => {
    // Extract the category id from the request parameters
    const categoryId = req.params.id;

    // Fetch products based on the category id
    const products = await Product.find({ category: categoryId });

    // Check if any products were found
    if (!products || products.length === 0) {
        throw new ApiError(404, 'No products found');
    }

    // Return a success response with the fetched products
    return res
        .status(200)
        .json(new ApiResponse(200, products, 'Products fetched successfully'));
});

export { createProduct, fetchAllProducts, fetchProductsByCategory };
