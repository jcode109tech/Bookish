const otpGenerator = require('otp-generator');

const generateOTP = async () => {
    let otp = await otpGenerator.generate(6,
        {upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false });

        return otp;
}


module.exports = generateOTP;
