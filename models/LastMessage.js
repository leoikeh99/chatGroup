const mongoose = require("mongoose");

const UnreadSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("unreadMessages", UnreadSchema);
