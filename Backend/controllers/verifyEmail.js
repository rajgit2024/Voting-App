const jwt = require("jsonwebtoken");
const { userByGmail, updateVerificationStatus } = require("../models/user");

const verifyEmail = async (req, res) => {
    try {
        console.log("Token Received:", req.params.token);
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = await userByGmail(decoded.email);

        if (!user) {
            return res.status(400).send("Invalid or expired token.");
        }

        if (user.is_verified) {
            return res.status(400).send("Email is already verified.");
        }

        await updateVerificationStatus(user.id);
        return res.status(200).send('Email verified successfully. You can now log in.');
    } catch (error) {
        console.error("Error during email verification:", error);
        return res.status(500).send('Email verification failed.');
    }
};

module.exports = {
    verifyEmail
};
