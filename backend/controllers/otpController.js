const mailSender = require('../utills/mailtility');

const sendVerificationEmail = async ( email, otp) => {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `<h1>Please confirm your OTP</h1>
            <p>Here is your OTP code: ${otp}</p>`
        );
        console.log("Email sent successfully: ", mailResponse);
    } catch (err) {
        console.log("Error occured while sending email: ", err)
        throw err;
    }
}

module.exports = sendVerificationEmail;
