require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const PORT = Number(process.env.PORT);
const indexRouter = require("./routes");

const app = express();
mongoose.connect(process.env.DB).then(() => {
  console.log("DB connected");
});
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use("/", indexRouter);
app.use((err, req, res, next) => {
  err = err ? err.toString() : "Something went wrong";
  res.status(500).json({ msg: err });
});
app.listen(PORT, () => {
  console.log(
    `Application running on port ${PORT}. URL is http://loaclhost:${PORT}`
  );
});
