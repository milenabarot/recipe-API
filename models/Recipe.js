const mongoose = require("mongoose");

// a blueprint for a recipe format

const RecipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://image.flaticon.com/icons/png/512/2917/2917630.png",
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
