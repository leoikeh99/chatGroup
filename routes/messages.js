const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Member = require("../models/Member");
const auth = require("../middleware/auth");
const LastMessage = require("../models/LastMessage");

router.get("/", auth, async (req, res) => {
  const id = req.user.id;

  try {
    const userChannels = await Member.find({ memberId: id });
    const getMessages = userChannels.map(async (channel) => {
      const messages = await Message.find({ channelId: channel.channel });
      return messages;
    });

    Promise.all(getMessages)
      .then((val) => res.json(arrange(userChannels, val)))
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});

router.post("/lastMessages", auth, async (req, res) => {
  const userId = req.user.id;
  const { channelId, lastMessage } = req.body;
  try {
    const check = await LastMessage.findOne({ userId, channelId });
    if (check) {
      await LastMessage.findByIdAndUpdate(
        check.id,
        { $set: { lastMessage } },
        { new: true }
      );
      res.json({ msg: "updated successfully" });
    } else {
      const message = new LastMessage({
        userId,
        channelId,
        lastMessage,
      });
      await message.save();
      res.json({ msg: "saved successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});

router.get("/lastMessages", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const lastmessages = await LastMessage.find({ userId });
    res.json(lastmessages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});

const arrange = (channels, messages) => {
  const result = [];
  for (let i = 0; i < channels.length; i++) {
    result.push({ channelId: channels[i].channel, messages: messages[i] });
  }
  return result;
};

module.exports = router;
