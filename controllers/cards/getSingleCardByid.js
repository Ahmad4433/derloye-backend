const Card = require("../../models/Card");
const getSingleCardByid = async (req, res, next) => {
  const id = req.query.id;
  try {
    const findedCard = await Card.findById(id).select("-user");

    res
      .status(200)
      .json({ message: "success", status: true, card: findedCard });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleCardByid;
