const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 5, maxlength: 30, match: /^[a-zA-Z0-9]+$/ },
    email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Please enter a valid email address'] },
    password: { type: String, required: true, minlength: 6, match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/ },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    phone: { type: String },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
    otp: { type: String }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
