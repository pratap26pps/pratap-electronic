const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

exports.imageuploadcloudanary= async (file,folder,height,quality)=>{
    const options={folder}
    if(height){
        options.height=height
    }
    if(quality){
        options.quality=quality
    }
    options.resource_type= "auto";

    return await cloudinary.uploader.upload(file.tempFilePath,options)

}