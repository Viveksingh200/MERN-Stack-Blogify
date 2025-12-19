import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: true
    }
},
    {timestamps: true}
);

export const User = model("User", userSchema);