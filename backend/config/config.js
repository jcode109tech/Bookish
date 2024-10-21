const dotenv = require('dotenv');

dotenv.config('./env');

const configVariables = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    CLOUDINARY_PUBLIC: process.env.CLOUDINARY_PUBLIC,
    CLOUNDINARY_NAME: process.env.CLOUNDINARY_NAME,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    MAIL_PORT: process.env.MAIL_PORT,
    JWT_SECRET: process.env.JWT_SECRET
};

module.exports = configVariables;