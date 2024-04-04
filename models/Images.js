const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema(
  {
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Images", imageSchema);
