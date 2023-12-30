import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true,
    },
    productImages: {
        type: Array,
        default: []
    }
}, { timeseries: true });

export const Product = mongoose.model("Product", productSchema);
