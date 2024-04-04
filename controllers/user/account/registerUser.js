const User = require("../../../models/User");
const bcrypt = require("bcrypt");
const registerUser = async (req, res, next) => {
  const { userName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res
      .status(200)
      .json({ message: "success", status: true, user_id: savedUser._id });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;
