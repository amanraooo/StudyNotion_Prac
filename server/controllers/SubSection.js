//const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

//create subsection
exports.createSubSection = async (req,res)=>{
    try{
        const {sectionId, title, timeDuration, description}= req.body

        const video = req.files.videoFile;

        if(sectionId || title || timeDuration, !description){
            return res.status(400).json({
                success: false,
                message:"ALL fields required"
            })
        }

        //uplad vid to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

        const SubsectionDetails = await SubSection.create({
            title : title, timeDuration: timeDuration, description: description,
            videoUrl : uploadDetails.secure_url
        })

        //update section 
        const updatedSection = await Section.findByIdAndUpdate(sectionId, 
            {
                $push:
                {
                    subSection: SubsectionDetails._id
                }
            },
            {new: true},
        ).populate("subSection")

  res.status(200).json({
			success: true,
			message: "subsection created",
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
