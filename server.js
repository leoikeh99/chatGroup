const express = require("express");
const app = express();
const connectDb = require("./config/db");

connectDb();
app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
