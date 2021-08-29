const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require("dotenv/config");

const PORT = process.env.PORT || 5000;

//Import Routes

const recipesRoute = require("./routes/recipes");

app.use(express.static("recipefrontend/build"));

//Middleware

app.use("/api/recipes", recipesRoute);

//Routes
// deliver frontend folder
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "./recipefrontend/build/index.html"));
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

app.listen(PORT);
