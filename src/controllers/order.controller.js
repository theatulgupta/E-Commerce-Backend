import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createOrder = asyncHandler(async (req, res) => {
    // Extract user and items from the request body
    const { user, items } = req.body;

    // Check if required data is provided
    if (!user || !items || !Array.isArray(items) || items.length === 0) {
        throw new ApiError(400, 'User and a non-empty array of items are required for order creation');
    }

    // Create a new order instance
    const order = new Order({ user, items });

    // Save the order to the database
    await order.save();

    // Return success response with the created order details
    return res
        .status(201)
        .json(new ApiResponse(true, 'Order created successfully', order));
});

const fetchAllOrders = asyncHandler(async (req, res) => {
    // Extract user ID from the request params
    const user = req.params.user;

    // Check if a valid user ID is provided
    if (!user) {
        throw new ApiError(400, 'User ID is required to fetch the orders');
    }

    // Fetch all orders from the database based on the user ID
    const orders = await Order.find({ "user._id": user });

    // Return success response with the fetched orders
    return res
        .status(200)
        .json(new ApiResponse(true, orders, 'Orders fetched successfully'));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    // Extract order ID and status from the request body
    const { orderId, status } = req.body;

    // Check if required data is provided
    if (!orderId || !status) {
        throw new ApiError(400, 'Order ID and status are required for order status update');
    }

    // Update the order status in the database
    const updatedOrder = await Order.findByIdAndUpdate(
        { _id: orderId },
        { status },
        { new: true }
    );

    // Check if the order exists
    if (!updatedOrder) {
        return res.
            status(404).
            json(new ApiResponse(404, null, 'Order not found'));
    }

    // Return success response with the updated order details
    return res
        .status(200)
        .json(new ApiResponse(200, updatedOrder, 'Order status updated successfully'));
});

export { createOrder, fetchAllOrders, updateOrderStatus };