const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Channel = require("../models/Channel");
const Message = require("../models/Message");
const Member = require("../models/Member");
const User = require("../models/User");

router.post("/", auth, async (req, res) => {
  const creator = req.user.id;
  const { name, desc } = req.body;
  try {
    const channel = new Channel({
      name,
      desc,
      creator,
    });

    const user = await User.findById(creator);
    const member = new Member({
      memberId: creator,
      channel: channel.id,
      username: user.username,
    });

    await channel.save();
    await member.save();
    res.json({ channel, member });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

router.post("/join/:id", auth, async (req, res) => {
  const memberId = req.user.id;
  const channel = req.params.id;
  try {
    const checkMember = await Member.findOne({ memberId, channel });
    if (checkMember) {
      return res.status(400).json({ msg: "Already a member" });
    } else {
      const user = await User.findById(memberId);
      const join = new Member({ memberId, channel, username: user.username });
      await join.save();

      const messages = await Message.find({ channelId: channel });
      const response = await Channel.findById(channel);
      const members = await Member.find({ channel });

      res.json({
        channel: response,
        members,
        messages: { channelId: channel, messages },
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const channels = await Channel.find({});
    const response = [];
    if (channels.length > 8) {
      for (let i = 0; i <= 8; i++) {
        if (channels[i]) {
          response.push(channels[i]);
        }
      }
      return res.json(response);
    } else {
      return res.json(channels);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

router.get("/single/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const channel = await Channel.findById(id);
    if (!channel) {
      return res.status(400).json({ msg: "Not a channel" });
    }
    res.json(channel);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

router.get("/search/:key", auth, async (req, res) => {
  const key = req.params.key;
  try {
    const channels = await Channel.find({});

    const response = channels.filter((channel) => {
      const regex = new RegExp(`${key}`, "gi");
      return channel.name.match(regex);
    });

    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

router.get("/myChannels", auth, async (req, res) => {
  const user = req.user.id;
  try {
    const memberChannels = await Member.find({ memberId: user });

    const getChannels = memberChannels.map(async (val) => {
      const channel = await Channel.findById(val.channel);
      return channel;
    });

    Promise.all(getChannels)
      .then((channels) => {
        //get channel members
        const channelMembers = channels.map(async (channel) => {
          const members = await Member.find({ channel });
          return members;
        });
        Promise.all(channelMembers)
          .then((members) => {
            res.json({ channels, members });
          })
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
