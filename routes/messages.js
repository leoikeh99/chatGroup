const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Member = require("../models/Member");
const auth = require("../middleware/auth");

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

const arrange = (channels, messages) => {
  const result = [];
  for (let i = 0; i < channels.length; i++) {
    result.push({ channelId: channels[i].channel, messages: messages[i] });
  }
  return result;
};

module.exports = router;
