const express = require("express");
const db = require("./db/dbConnect.js");
const app = express();
require("dotenv").config();
const cors = require("cors");
const Enrollment = require("./routes/enrollment.js");

const { PORT } = process.env || 4000;

app.use(express.json());
db.connect();

app.use(
  cors({
    origin: "*",
    // credentials: true,
  })
);

app.use("/api/v1/enrollment", Enrollment);
app.get("/", (req, res) => {
  res.send("Welcome to the Enrollment API");
});
app.listen(PORT, () => {
  console.log(`App is Up and Running at ${PORT}`);
});
