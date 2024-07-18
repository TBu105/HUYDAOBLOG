import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deletePost } from "../api/postApi";

const DeletePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Post</h1>
      <p>Are you sure you want to delete this post?</p>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white p-2 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default DeletePost;
