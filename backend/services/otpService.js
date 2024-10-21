const crypto = require('crypto');
const nodemailer = require('nodemailer');

const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
};

const sendOtp = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your email password or app password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Error sending OTP');
    }
};

module.exports = {
    generateOtp,
    sendOtp,
};
