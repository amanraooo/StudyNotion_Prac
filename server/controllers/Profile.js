const Profile = require('../models/Profile');
const User = require('../models/User');

exports.updateProfile = async(req,res)=>{
    try{
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;

        const id = req.user.id;

        if(!contactNumber|| !gender) return res.status(400).json({success: false, message:"All fileds req"})

            //find profile
            const userDetails = await User.findById(id);
            const profileId = userDetails.additionalDetails;
            const ProfileDetails = await Profile.findById(profileId)

            //update profile
            ProfileDetails.dateOfBirth = dateOfBirth;
            ProfileDetails.about = about;
            ProfileDetails.gender = gender;
            ProfileDetails.contactNumber = contactNumber;
            await ProfileDetails.save()
res.status(200).json({
			success: true,
			message: "profile updated",
			ProfileDetails,
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
//delete account 
exports.deleteAccount = async(req, res)=>{
    try{
        const id = req.user.id;

        const userdetails = User.findById(id);
        if(!userdetails) return res.status(404).json({success: false, message: "user not found"})

            //delete profile
            await Profile.findByIdAndDelete({_id: userdetails.additionalDetails})

            //Todo undenroll an user from all unenrolled courses


            //delete user
            await User.findByIdAndDelete({_id:id})

            return res.status(200).json({
                success: true,
                message: 'User Deleted Successfully'
            })

   }
   catch(error){
    res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
   }
}

//get user details
exports.getAllUserDetails = async (req,res)=>{
    try{
        const userId = req.user.id

        const userDetails = User.findById(id).populate("additionalDetails");

        if(!userDetails) return res.status(404).json({sucess:false, message:"User not found" })
            
            return res.status(200).json({success: true, message: "USer data fetched successfully"})

    }catch(error){
        res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}