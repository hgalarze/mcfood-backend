import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { isValidPassword } from '../utils/validators.js';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 2,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 2,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 2,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: false,
        trim: true,
        lowercase: true
    },
    address: {
        type: String,
        trim: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return isValidPassword(value);
            },
            message: "Password must be bewteen 6 and 12 characters, with at least one number, one uppercase letter and one lowercase letter"
        }
    }
}, { timestamps: true});

userSchema.pre("save", function(next) {
    this.passwordHash = bcrypt.hashSync(this.passwordHash, 10);
    next();
});

userSchema.index({ address: "text" });

export default mongoose.model("user", userSchema);