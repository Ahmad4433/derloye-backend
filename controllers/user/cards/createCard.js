const Card = require("../../../models/Card");
const User = require("../../../models/User");

const createCard = async (req, res, next) => {
  const { data, userId } = req.body;

  try {
    const findedUser = await User.findById(userId);

    const newCard = new Card({
      data,
      user: findedUser._id,
    });

    const savedCard = await newCard.save();

    findedUser.card.push(savedCard._id);
    await findedUser.save();
    res
      .status(200)
      .json({ message: "success", status: true, card_id: savedCard._id });
  } catch (error) {
    next(error);
  }
};

module.exports = createCard;
