const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');

exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;

        const { rating, review, courseId } = req.body;

        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: userId
        });

        if (!courseDetails) {
            return res.status(404).json({
                succes: false,
                message: 'Student is not enrolled in the course'
            })
        }

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });

        if (alreadyReviewed) return res.status(403).json({
            message: false,
            message: 'Course is already reviwed by the user'
        });

        const ratingReview = await RatingAndReview.create({
            rating, review, course: courseId,
            user: userId
        });

        await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "rating and review created successfully",
            ratingReview,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//get avgrating 
exports.getAveragingRating = async (req, res) => {
    try {
        const courseId = req.body.courseId;

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ])

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        return res.status(200).json({
            success: true,
            message: 'avg rating is 0 no rsting is given',
            averageRating: 0,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}



//get rating and  reviews of course specific