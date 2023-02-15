const { User, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();

// Get User Information
router.get("/", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

// Register User
router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne(
    { username: req.body.username, email: req.body.email },
    function (err, user) {
      if (err) return console.error("Error:", err);

      console.log("User:", user);
      res.send(user);
    }
  );
  //   const user = await User.findOne({
  //     username: req.body.username,
  //     email: req.body.email,
  //   });

  //   if (user) return res.status(400).send("User or Email has already existed");

  //   let newUser = {
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: req.body.password,
  //   };

  //   await User.insertMany(newUser);
});

module.exports = router;
