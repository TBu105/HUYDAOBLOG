const express = require("express");
const router = express.Router();
const {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPosts,
  searchPosts,
} = require("../controllers/post.controller");
const { uploadPostImage } = require("../middlewares/uploadFile.middleware");

//CREATE
router.post("/", uploadPostImage, createPost);

//UPDATE
router.put("/:id", updatePost);

//DELETE
router.delete("/:id", deletePost);

//GET POST DETAILS
router.get("/:id", getPostById);

//GET POSTS
router.get("/list/:pageNumber", getPosts);

//SEARCH POSTS
router.get("/search/:keywords", searchPosts);

module.exports = router;
