const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// Gets pack all posts
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submits a post
router.post("/", async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    image: req.body.image,
  });

  try {
    const savedRecipe = await recipe.save();
    res.json(savedRecipe);
  } catch (err) {
    res.json({ message: err });
  }
});

//Gets back a specific post
router.get("/:postId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.postId);
    res.json(recipe);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete post
router.delete("/:postId", async (req, res) => {
  try {
    const removedRecipe = await Recipe.remove({ _id: req.params.postId });
    res.json(removedRecipe);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedRecipe);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
