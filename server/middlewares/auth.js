const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
// Configuring dotenv to load environment variables from .env file
dotenv.config();

//auth
exports.auth = async (req, res, next) => {
    try {

        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", "")

        //if token missing, return response
        if (!token) return res.status(401).json({
            success: false, message: 'Token is missing'
        })
        //verify token
        try {

            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode)
            req.user = decode;

        } catch (err) {
            return res
                .status(401)
                .json({ success: false, message: "token is invalid" });
        }

        // If JWT is valid, move on to the next middleware or request handler
        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: `Something Went Wrong While Validating the Token`,
        });
    }
};

//isStudent 
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                succcess: false,
                message: "This is a protected route for Students only "
            })
            next();
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};
exports.isAdmin = async (req, res, next) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });

        if (userDetails.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Admin",
            });
        }
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};
exports.isInstructor = async (req, res, next) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });
        console.log(userDetails);

        console.log(userDetails.accountType);

        if (userDetails.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Instructor",
            });
        }
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};