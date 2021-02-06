const jwt = require("jsonwebtoken");
const config = require("config");
const Message = require("./models/Message");
const Channel = require("./models/Channel");
const User = require("./models/User");
const LastMessage = require("./models/LastMessage");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected");

    //join a room
    socket.on("join", (rooms) => {
      rooms.forEach((room) => {
        socket.join(room);
      });
    });

    // send a message to a room
    socket.on("sendMessage", async (data) => {
      const { id, text, token, avatar } = data;
      const senderId = jwt.verify(token, config.get("jwtSecret")).user.id;
      if (senderId) {
        try {
          const user = await User.findById(senderId);
          if (user) {
            const senderName = user.username;

            const channel = await Channel.findById(id);

            if (channel) {
              const message = new Message({
                channelId: id,
                senderName,
                senderId,
                text,
                avatar: avatar ? true : false,
              });
              await message.save();

              const check = await LastMessage.findOne({
                userId: senderId,
                channelId: id,
              });
              if (check) {
                await LastMessage.findByIdAndUpdate(
                  check.id,
                  { $set: { lastMessage: message.id } },
                  { new: true }
                );
              } else {
                const lastmessage = new LastMessage({
                  userId: senderId,
                  channelId: id,
                  lastMessage: message.id,
                });
                await lastmessage.save();
              }
              socket.to(id).emit("recieveMessage", {
                ...message._doc,
                lastMessage: message.createdAt,
              });
            }
          }
        } catch (err) {
          console.error(err.message);
        }
      }
    });

    socket.on("disconnect", (data) => {
      console.log("Disconnected");
    });
  });
};
