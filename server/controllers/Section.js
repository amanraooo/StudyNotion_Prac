const Section = require("../models/Section");
const Course = require("../models/Course");
//const SubSection = require('../models/SubSection');

// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

//update a section
exports.updateSection = async (req, res)=>{
    try{
        const {sectionName, sectionId} = req.body;

        const updatedSection = Section.findByIdAndUpdate(sectionId,
            {sectionName},
            {new: true}
        )

        res.status(200).json({
			success: true,
			message: "section created",
			data:updatedSection,
		});
    }catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
}

//delete section
exports.deleteSection = async(req,res)=>{
    try{
        const {sectionId} = req.body;

        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({success:true},{messsage:"Section deleted successfully"})
    }catch(error){

    }
}