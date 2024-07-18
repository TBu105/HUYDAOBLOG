const Post = require("../models/post.model");

const createPost = async (req, res) => {
  try {
    req.body.photo = res.locals.photo;
    const newPost = await Post.create(req.body);

    res.status(200).json({ newPost });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ updatedPost });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

const searchPosts = async (req, res) => {
  try {
    const regexSearch = new RegExp(req.params.keywords);
    const post = await Post.find(
      {
        $text: { $search: regexSearch },
      },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .lean();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPosts = async (req, res) => {
  try {
    const { pageNumber } = req.params;
    const skipDoc = 2;
    const posts = await Post.find()
      .skip((pageNumber - 1) * skipDoc)
      .limit(skipDoc)
      .lean();
    const totalPost = await Post.estimatedDocumentCount();
    res.status(200).json({ posts, totalPost, skipDoc });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  searchPosts,
  getPosts,
};
