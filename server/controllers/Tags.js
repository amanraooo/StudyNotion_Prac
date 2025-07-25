const Tag = require('../models/tags');


//create tag
exports.createTag = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) return res.status(400).json({
            succcess: false,
            message: "all fields are required"
        })

        const tagDetails = await Tag.create({
            name: name,
            description: description,
        })
        console.log(tagDetails);

        return res.status(200).json({ succcess: true, message: "Tag created successfully" })
    }
    catch (error) {
        return res.status(500).json({
            succcess: false,
            message: error.message,
        })
    }
}

//get all tags
exports.showAllTags = async (req, res) => {
    try {
        const allTags = await Tag.find({}, { name: true, description: true })

        res.status(200).json({
            success: true,
            message: "All tags returned successfully",
            allTags,
        })
    } catch (error) {
        return res.status(500).json({
            succcess: false,
            message: error.message,
        })
    }
}