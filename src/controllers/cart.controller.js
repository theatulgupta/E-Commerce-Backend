import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Cart } from '../models/cart.model.js';
import { asyncHandler } from '../utils/asyncHandler.js'

const addToCart = asyncHandler(async (req, res) => {
    // Extract data from the request body
    const { product, user, quantity } = req.body;

    // Check if required data is provided
    if (!product || !user || !quantity) {
        throw new ApiError(400, 'Product, user, and quantity are required for adding to cart');
    }

    // Find or create the user's cart in the database
    let cart = await Cart.findOneAndUpdate(
        { user: user },
        {},
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Find the existing item in the cart, if any
    const existingItem = cart.items.find(item => item.product.toString() === productId);

    // If the item exists, increment the quantity; otherwise, add a new item
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    // Save the updated cart
    await cart.save();

    // Return success response
    return res.status(200).json(new ApiResponse(200, cart, 'Product added to cart successfully'));
});

const removeFromCart = asyncHandler(async (req, res) => {
    // Extract data from the request body
    const { userId, productId } = req.body;

    // Check if required data is provided
    if (!userId || !productId) {
        throw new ApiError(400, 'User ID and product ID are required for removing from cart');
    }

    // Find and update the user's cart in the database
    const cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $pull: { items: { product: productId } } },
        { new: true } // Return the modified cart
    );

    // Check if the cart exists
    if (!cart) {
        throw new ApiError(404, 'Cart not found');
    }

    // Return success response
    return res
        .status(200)
        .json(new ApiResponse(200, cart, 'Product removed from cart successfully'));
});

const getCart = asyncHandler(async (req, res) => {
    // Extract user ID from the request params
    const user = req.params.user;

    // Check if a valid user ID is provided
    if (!user) {
        throw new ApiError(400, 'User ID is required to fetch the cart');
    }

    // Find the cart in the database based on the user ID
    const cart = await Cart.findOne({ user: user });

    // If cart not found, return a 404 response
    if (!cart) {
        throw new ApiError(404, 'Cart not found');
    }

    // Return success response with the fetched cart
    return res
        .status(200)
        .json(new ApiResponse(200, cart, 'Cart fetched successfully'));
});



export { addToCart, removeFromCart, getCart };
