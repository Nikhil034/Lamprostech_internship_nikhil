import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        lowercase: true,
    },
    user_email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true,
    },
    user_phone: {
        type: Number,
        required: true,
    },
    user_company: {
        type: String,
        required: true,
        lowercase: true,
    },
    user_company_type: {
        type: String,
        required: true,
    },
    user_company_size: {
        type: Number,
        required: true,
    },


}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);