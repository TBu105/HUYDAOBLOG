const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("debug", true), mongoose.set("debug", { color: true });
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected successfully!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connectDB };
