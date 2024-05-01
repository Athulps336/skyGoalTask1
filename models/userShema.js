const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Enter a valid email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (!validator.isStrongPassword(value, { minLength: 6 })) {
                throw new Error("The Password must be 6 characters long and should contain at least one uppercase letter, one lowercase letter, one number, and one special character");
            }
        }
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    profession: {
        type: String,
        required: true,
        trim: true
    }
});

const User = mongoose.model('User', userSchema); 
module.exports = User;
