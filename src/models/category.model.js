import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    description: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export const Category = mongoose.model("Category", categorySchema);