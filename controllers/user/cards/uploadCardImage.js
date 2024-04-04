const Images = require("../../../models/Images");
const cloudinary = require("cloudinary").v2;

const uploadCardImage = async (req, res, next) => {
  cloudinary.config({
    cloud_name: "dhqwq5tmh",
    api_key: "178472134475739",
    api_secret: "akUIq13dXsEJCVMQivE7LPa9gpM",
  });

  try {
    const file = await cloudinary.uploader.upload(req.file.path);

    const newImg = new Images({
      img: file.secure_url,
    });

    const savedImg = await newImg.save();

    res
      .status(200)
      .json({ messag: "success", status: true, imgPath: savedImg.img });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadCardImage;
