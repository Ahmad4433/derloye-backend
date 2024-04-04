const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    data: { type: Object },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    card_index: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
