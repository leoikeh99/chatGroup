const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
var validator = require("email-validator");
const Member = require("../models/Member");

const User = require("../models/User");
const Channel = require("../models/Channel");

//Login a user
router.post(
  "/login",
  check("password", "Password is needed").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      var userPassword;
      var id;
      if (validator.validate(email)) {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ msg: "Invalid credentials" });
        } else {
          userPassword = user.password;
          id = user.id;
        }
      } else {
        const user = await User.findOne({ username: email });
        if (!user) {
          return res.status(400).json({ msg: "Invalid credentials" });
        } else {
          userPassword = user.password;
          id = user.id;
        }
      }

      const checkPass = await bcrypt.compare(password, userPassword);

      if (!checkPass) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const payload = {
        user: {
          id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "server error" });
    }
  }
);

//register a user
router.post(
  "/register",
  check("username", "Username is required").not().isEmpty(),
  check("email", "Email invalid").isEmail(),
  check("password", "Password should be at least 6 characters").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      const checkUsername = await User.findOne({ username });
      const checkEmail = await User.findOne({ email });

      if (checkUsername) {
        return res.status(400).json({ msg: "Username already exists" });
      }
      if (checkEmail) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      var user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const adminChannel = await Channel.findOne({ name: "Welcome" });

      const member = new Member({
        channel: adminChannel._id,
        memberId: user.id,
        username: user.username,
      });

      await member.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "server error" });
    }
  }
);

//get a user
router.get("/", auth, async (req, res) => {
  const id = req.user.id;

  try {
    const memberChannels = await Member.find({ memberId: id });
    const user = await User.findById(id).select("-password");
    const getChannels = memberChannels.map(async (val) => {
      const channel = await Channel.findById(val.channel);
      return channel;
    });

    Promise.all(getChannels)
      .then((channels) => {
        res.json({ ...user._doc, rooms: channels.map((val) => val._id) });
      })
      .catch((err) => res.status(500).json({ msg: "server error" }));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
