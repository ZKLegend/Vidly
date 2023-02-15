const { Rental } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rental = await Rental.find().sort("-dateOut");
  res.send(rental);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) {
    res.status(404).send("No rental found");
    return;
  }

  res.send(rental);
});

router.post("/", async (req, res) => {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    return res.status(400).send("No Customer Found");
  }

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    return res.status(400).send("No Movie Found");
  }

  if (movie.numberInStock === 0) {
    return res.status(400).send("Movie is out of stock");
  }

  const rental = {
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentaRate: movie.dailyRentalRate,
    },
  };
  const result = await Rental.insertMany(rental);

  movie.numberInStock--;
  movie.save();

  res.send(result);
});

module.exports = router;
