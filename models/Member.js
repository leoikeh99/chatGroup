const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "channel",
    required: true,
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("members", memberSchema);
