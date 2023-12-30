import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: {
        type: [cartItemSchema],
        default: []
    },
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);