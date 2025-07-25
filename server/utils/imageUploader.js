const cloudinary = required('cloudinary') 

//image uploader to cloudinary

exports.uploadImageToCloudinary = async(file, folder, height, quality)=>{
    const options = {folder}
    if(height){
        options.height = height;
    }
    if(quality){
        options.height = quality;
    }
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options)
}