const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// Gets back all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.json({ message: err });
  }
});

//search query get request by title of recipe, partial search
// i for case insensitive matching

router.get("/search/:title", async (req, res) => {
  let regex = new RegExp(req.params.title, "i");
  try {
    const recipe = await Recipe.find({
      title: { $regex: regex },
    });
    res.json(recipe);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submits a post
// check to see if the image an empty string
// if it is an empty string, it is set to undefined so it picks up the default image
router.post("/", async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    image: req.body.image.length ? req.body.image : undefined,
  });

  try {
    const savedRecipe = await recipe.save();
    res.json(savedRecipe);
  } catch (err) {
    res.json({ message: err });
  }
});

//Gets back a specific post
//this get request by ID isn't used in the front end
router.get("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    res.json(recipe);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete post
router.delete("/:recipeId", async (req, res) => {
  try {
    const removedRecipe = await Recipe.remove({ _id: req.params.recipeId });
    res.json(removedRecipe);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a post
router.patch("/:recipeId", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: req.params.recipeId },
      { title: req.body.title },
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
