const jwt = require("jsonwebtoken");
const config = require("config");
const Message = require("./models/Message");
const Channel = require("./models/Channel");
const User = require("./models/User");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected");

    //join a room
    socket.on("join", (rooms) => {
      rooms.forEach((room) => {
        socket.join(room);
        console.log(`joined room ${room}`);
      });
    });

    // send a message to a room
    socket.on("sendMessage", async (data) => {
      const { id, text, token } = data;
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
              });
              await message.save();
              socket.to(id).emit("recieveMessage", message);
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
