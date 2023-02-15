const movies = require("./routes/movies");
const customers = require("./routes/customers");
const genres = require("./routes/genres");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://0.0.0.0:27017/vidly")
  .then(() => console.log("Connect to MongoDB..."))
  .catch((err) => console.error(err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
