const User = require("../../models/User");
const userCardList = async (req, res, next) => {
  const userId = req.query.userId;

  try {
    const findedList = await User.findById(userId)
      .populate([
        {
          path: "card",
          select: "-user",
        },
      ])
      .sort({ _id: -1 });

    res
      .status(200)
      .json({ message: "success", status: true, list: findedList.card });
  } catch (error) {
    next(error);
  }
};

module.exports = userCardList;
