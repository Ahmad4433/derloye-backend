const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    data: { type: Object },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    card_index: { type: Number },
    active: { type: String, default: "false" },
    name: { type: String, default: "default" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
