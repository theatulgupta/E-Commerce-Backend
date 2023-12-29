import mongoose, { Schema } from "mongoose";

import bcrypt from 'bcrypt';

const addressSchema = new Schema({
    street: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    postalCode: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    }
}, { _id: false }); // Prevent Mongoose from creating a separate _id field for the address object

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            default: ""
        },
        address: addressSchema, // Nested address object
        profileProgress: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    // Hash the password
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
    const update = this.getUpdate();

    // Optionally remove _id from the update object
    delete update._id;

    // Update the updatedAt field
    this.set({ updatedAt: new Date() });

    next();
});

userSchema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compareSync(password, this.password);
}

export const User = mongoose.model("User", userSchema);
