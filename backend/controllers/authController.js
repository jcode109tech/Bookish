const User = require('../models/UserModel');
const OTP = require('../models/OtpModel');
const otpService = require('../services/otpService');
const tokenGenerator = require('../utills/tokenGenerator');


exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received registration request:', { username, email, password });
    try {
        const newUser = await User.create({username, email, password });
        res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error) {

        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = tokenGenerator.generateToken(user._id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const otp = otpService.generateOtp();
        await OTP.create({ userId: user._id, otp });
        await otpService.sendOtp(email, otp);
        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        const otpRecord = await OTP.findOne({ userId: user._id }).sort({ createdAt: -1 });
        if (!otpRecord || otpRecord.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }
        await OTP.deleteMany({ userId: user._id });
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
