const { truncate } = require('fs/promises');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');

//reset password token
exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.json({
                success: false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
            })
        }

        //create token 
        const token = crypto.randomUUID();

        const updatedDetails = await User.findOneAndUpdate({ email: email },
            { token: token },
            { resetPasswordExpires: Date.now() + 3600000 },
            { new: true })
        console.log("details", updatedDetails)


        //url
        const url = `http://localhost:3000/update-password/${token}`

        await mailSender(
            email,
            "Password reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        )
        res.json({
            success: true,
            message:
                "Email Sent Successfully, Please Check Your Email to Continue Further",
        })

    } catch (error) {
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Sending the Reset Message`,
        })
    }

}

//password reset
exports.resetPassword = async (req, res) => {
    try {
        const { passsword, confirmPassword, token } = req.body;

        if (confirmPassword !== passsword) {
            return res.json({
                success: false,
                message: "Password and confirm password does not match"
            })
        }

        const user = await User.findOne({ token: token });
        if (!user) return res.json({
            success: false,
            message: "Token is Invalid",
        })

        if (!(user.resetPasswordExpires > Date.now())) {
            return res.status(403).json({
                success: false,
                message: `Token is Expired, Please Regenerate Your Token`,
            })
        }

        const hashedPass = await bcrypt.hash(passsword, 10);

        await User.findOneAndUpdate({ token: token },
            { password: hashedPass },
            { new: true }
        )
        res.json({
            success: true,
            message: `Password Reset Successful`,
        })
    } catch (error) {
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Updating the Password`,
        })
    }
}