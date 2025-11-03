import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is required"],
        maxlength: 50,
        minlength: 2,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
        minlength: 2,
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price field is required"],
        min: [1, "Price field has to be a number"]
    },
    stock: {
        type: Number,
        required: true,
        min: [0, "Stock can't be a negative number"]
    },
    imageUrl: {
        type: String,
        default: null
    },
     highlighted: {
        type: Boolean,
        default: false
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true }
}, { timestamps: true });

export default mongoose.model("product", productSchema);