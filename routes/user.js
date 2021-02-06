const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Message = require("../models/Message");
const Member = require("../models/Member");
const config = require("config");
const auth = require("../middleware/auth");
const multer = require("multer");
const url = config.get("mongoURI");
const GridFSBucket = require("multer-gridfs-storage");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { createConnection } = require("mongoose");

const conn = createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const crypto = require("crypto");
const path = require("path");

const storage = new GridFSBucket({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

router.get("/avatar/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const checkAv = user.avatar;
    if (user.avatar) {
      gfs.files.findOne({ _id: checkAv }, (err, file) => {
        if (!file || file.length === 0) {
          avatar = null;
        }

        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png" ||
          file.contentType === "image/jpg"
        ) {
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        }
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "server error" });
  }
});

router.put("/", auth, upload.single("avatar"), async (req, res) => {
  const id = req.user.id;
  const { username } = JSON.parse(req.body.data);
  try {
    const user = await User.findById(id);
    const update = {};
    const update2 = {};
    if (username) {
      update.username = username;
      const check = await User.findOne({ username });
      if (check && check._id.toString() !== id) {
        return res.status(400).json({ msg: "Username already taken" });
      }
    }
    if (username) update2.senderName = username;

    if (req.file) {
      if (
        req.file.contentType === "image/jpeg" ||
        req.file.contentType === "image/png" ||
        req.file.contentType === "image/jpg"
      ) {
        if (user.avatar) {
          gfs.remove(
            { _id: user.avatar, root: "uploads" },
            (err, gridStore) => {
              if (err) {
                res.status(400).json({ err });
              }
            }
          );
        }
        update.avatar = req.file.id;
        await Message.updateMany({ senderId: id }, { $set: { avatar: true } });
        await Member.updateMany({ memberId: id }, { $set: { avatar: true } });
      }
    }
    await User.findByIdAndUpdate(id, { $set: update }, { new: true });

    if (username) {
      await Member.updateMany(
        { memberId: id },
        { $set: { username: username } },
        { new: true }
      );
    }
    await Message.updateMany(
      { senderId: id },
      { $set: update2 },
      { new: true }
    );
    const user2 = await User.findById(id);

    res.json({ msg: "Profile updated successfully", user2: user2 });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
