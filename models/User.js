const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    card: [{ type: mongoose.Types.ObjectId, ref: "Card" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
