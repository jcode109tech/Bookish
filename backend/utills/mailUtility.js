const nodemailer = require('nodemailer');
const configVariables = require('../config/config');

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Always use smtp.gmail.com for Gmail
            port: 465, // Use 465 for SSL
            secure: true, // Use true for port 465
            auth: {
                user: configVariables.MAIL_USER,
                pass: configVariables.MAIL_PASS,
            }
        })
        let info = await transporter.sendMail({
            from: configVariables.MAIL_USER,
            to: `${email}`,
                subject: `${title}`,
                html: `${body}`,
        })
        console.log("info is here: ", info)
        return info;
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = mailSender;