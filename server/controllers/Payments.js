const { instance } = require('../config/razorpay');
const Course = require("../models/Course");
const User = require('../models/User');
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose")
const {
    courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")



//capture the payment and initiate the razorpay order

exports.capturePayment = async (req, res) => {
    const { course_id } = req.body;
    const userId = req.user.id;

    if (!course_id) {
        return res.json({
            success: false,
            message: 'Please provide  valid course id  '
        })
    };

    let course;
    try {
        course = await Course.findById(course_id);
        if (!course) {
            return res.json({
                success: false,
                message: 'cant find the course'
            })
        }

        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res.json({
                success: false,
                message: 'student is already enrolled'
            })
        }

        //order create
        const amount = course.price;
        const currency = 'INR';

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: course_id,
                userId
            }
        };

        try {
            //initialize the  payment using razorpay

            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);

            return res.status(200).json({
                success: true,
                course: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount
            });
        }
        catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: 'could not  initiate order'
            })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'student is already enrolled'
        })
    }
}

//verify signature
exports.verifySignature = async (req, res) => {
    const webhookSecret = '12345678';

    const signature = req.headers['x-razorpay-signature'];

    const shasum = crypto.createHmac('sha256', webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (signature === digest) {
        console.log("payment is Authorized");


        const {courseId, userId}= req.body.psyload.payment.entity.notes;

        try{

            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push:{studentsEnrolled: userId},
                 new:true},
            )

            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    message: 'Could not found'
                })
            }
            console.log(enrolledCourse);

            const enrolledStudent = await User.findOneAndUpdate(
                {_id:userId},
                {$push: {course:courseId}, new: true},
            )
            console.log(enrolledStudent);

            const  emailResponse = await mailSender(enrolledStudent.email,
                "Congratulations",
                "You have successfully enrolled in the course"
            );
            console.log(emailResponse);

            return res.status(200).json({
                success: true,
                message: "Signature veriified and course added",
            })

        }catch(err){
            console.log(error);
            
        }
    }
}