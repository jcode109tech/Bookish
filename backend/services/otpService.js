const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
};

const sendOtp = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: process.env.MAIL_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER, // Corrected variable name
            pass: process.env.MAIL_PASS // Your email password or app password
        }
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully'); // Optional success message
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Error sending OTP');
    }
};

module.exports = {
    generateOtp,
    sendOtp,
};
