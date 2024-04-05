const Card = require("../../../models/Card");
const User = require("../../../models/User");
// const cloudinary = require("cloudinary").v2;

const createCard = async (req, res, next) => {
  const { data, userId } = req.body;
  //   cloudinary.config({
  //     cloud_name: "dhqwq5tmh",
  //     api_key: "178472134475739",
  //     api_secret: "akUIq13dXsEJCVMQivE7LPa9gpM",
  //   });

  try {
    if (!req.paymentStatus) {
      const error = new Error("payment failed");
      error.statusCode = 400;
      throw error;
    }

    const findedUser = await User.findById(userId);

    // const filePath = await cloudinary.uploader.upload(req.file.path);
    const newCard = new Card({
      data,
      user: findedUser._id,
    });

    const savedCard = await newCard.save();

    findedUser.card.push(savedCard._id);

    res
      .status(200)
      .json({ message: "success", status: true, card_id: savedCard._id });
  } catch (error) {
    next(error);
  }
};

module.exports = createCard;
