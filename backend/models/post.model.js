const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

//create index for full text search
// PostSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Post", PostSchema);
