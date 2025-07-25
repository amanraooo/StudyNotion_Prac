const Course = require("../models/Course")
const Category = require("../models/Category")
const Section = require("../models/Section")
const SubSection = require("../models/Subsection")
const User = require("../models/User")
const { uploadImageToCloudinary } = require('../utils/imageUploader')
const tags = require("../models/tags")


//create course
exports.createCourse = async (req, res) => {

    try {
        const userId = req.user.id;
        let {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag: _tag,

        } = req.body

        // Get thumbnail image from request files
        const thumbnail = req.files.thumbnailImage

        // Check if any of the required fields are missing
        if (
            !courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            })
        }


        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        })

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found",
            })
        }

        // Check if the tag given is valid
        const tagDetails = await Tag.findById(tag)
        if (!tagDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            })
        }
        // Upload the Thumbnail to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        )
        console.log(thumbnailImage)

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,

        })

        await User.findByIdAndUpdate({
            _id: instructorDetails._id,
        },

            {
                $push: {
                    course: newCourse._id,
                },
            },
            { new: true }
        )
        res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        })
    } catch (error) {
        // Handle any errors that occur during the creation of the course
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        })
    }
}

//get all course
exports.showAllCourses = async (req, res) => {
    try {
        const getCourses = await Course.find({},
            { 
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReview: true,
                studentsEnrolled: true
            },

        ).populate("Instructor").exec();

        return res.status(200).json({
            succcess: true,
            message: "Data fetched for courses duccessfully",
            data: getCourses
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data ",
            error: error.message
        })
    }
}