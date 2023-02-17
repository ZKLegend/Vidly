const { User, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();

// Get User Information
router.get("/", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

// Register User Using Async Await
router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (user && user != null) return res.send("User or Email already existed");

    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    await User.insertMany(newUser);

    res.status(200).send(newUser);
  } catch (err) {
    res.status(400).send("Something wrong");
    console.error(err);
    return;
  }

  //Register Using Callback
  // User.findOne(
  //   {
  //     username: req.body.username,
  //     email: req.body.email,
  //   },
  //   function (err, user) {
  //     if (err) {
  //       res.send(err);
  //       return;
  //     }
  //     if (user && user != null) return res.send("User already existed");

  //     let newUser = {
  //       username: req.body.username,
  //       email: req.body.email,
  //       password: req.body.password,
  //     };

  //     User.insertMany(newUser, function (err, user) {
  //       if (err) return res.send(err);
  //       res.send(user);
  //     });
  //   }
  // );
});

//Login User
// router.post("/login", (req, res) => {
//   const { error } = validateUser(body.req);
//   if (error) return res.status(400).send(error.details[0].message);

//   User.find
// });

module.exports = router;
