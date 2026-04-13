const cloudinary = require('cloudinary').v2;;


const uploadToCloudinary = async ({ mimetype, imgBuffer }) => {
  const dataUrl = `data:${mimetype};base64,${imgBuffer.toString("base64")}`;

  return await cloudinary.uploader.upload(dataUrl);
};

module.exports = {uploadToCloudinary}


