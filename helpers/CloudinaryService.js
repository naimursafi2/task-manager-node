const cloudinary = require("cloudinary").v2;

const uploadToCloudinary = async ({ mimetype, imgBuffer }) => {
  const dataUrl = `data:${mimetype};base64,${imgBuffer.toString("base64")}`;

  return await cloudinary.uploader.upload(dataUrl);
};

 const destroyFromCloudinary = (url)=>{
  console.log(url);
  
//   cloudinary.uploader.destroy('sample_image_id', (error, result) => {
//   console.log(result, error);
// });
}

module.exports = { uploadToCloudinary, destroyFromCloudinary };
