const mongoose = require("mongoose");

const saveUrlSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  url: {
    type: String,
    unique: [true, "url already exits"],
    maxlength: 4000,
    required: true,
  },
  shortenUrl: { type: String, unique: true, required: true },
  clicks: { type: Number, default: 0 },
});

// now we will export the model
// with the upper schema

module.exports = mongoose.model("saveURL", saveUrlSchema);