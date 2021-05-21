const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require("dotenv/config");

//Import Routes

const recipesRoute = require("./routes/recipes");

//Middleware

app.use("/recipes", recipesRoute);

//Routes
app.get("/", (req, res) => {
  res.send("We are on home");
});

//Connect to DB
//Mongoose middle man between database and back end
// a library to communicate with MongoDB

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB!");
  }
);

app.listen(3000);
