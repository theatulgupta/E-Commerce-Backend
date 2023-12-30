import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
    product: {
        type: Map,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1
    }

});

const orderSchema = new Schema({
    user: {
        type: Map,
        required: true
    },
    items: {
        type: [orderItemSchema],
        default: []
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Dispatched", "Shipped", "Delivered"],
        default: "Pending"
    }
});
export const Order = mongoose.model('Order', orderSchema);