require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");

// database
const { connectDB } = require("./database/connect.database");

// router
const postRoute = require("./routes/posts.route");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(cors());

//router
app.use("/api/v1/posts", postRoute);

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

const PORT = process.env.PORT || 3091;

app.listen(PORT, () => {
  connectDB();
  console.log("app is running on port " + PORT);
});
