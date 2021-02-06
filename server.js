const express = require("express");
const app = express();
const connectDb = require("./config/db");
const sockets = require("./sockets");
const path = require("path");

connectDb();
app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/channel", require("./routes/channel"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/user", require("./routes/user"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
var server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const io = require("socket.io")(server);
sockets(io);
