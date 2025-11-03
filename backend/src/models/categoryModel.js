import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 2,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },
    imageUrl: {
        type: String,
        default: null
    },
}, { timestamps: true});

export default mongoose.model("category", categorySchema);