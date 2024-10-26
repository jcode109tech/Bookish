const dotenv = require('dotenv');

dotenv.config('./env');

const configVariables = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    MAIL_PORT: process.env.MAIL_PORT,
    JWT_SECRET: process.env.JWT_SECRET
};

module.exports = configVariables;