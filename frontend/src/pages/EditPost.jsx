import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, updatePost, deletePost } from "../api/postApi";
import SearchBar from "../components/SearchBar";
import QuillEditor from "../utils/QuillEditor";
import parse from "html-react-parser";

const EditPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getPosts()
      .then((response) => setPosts(response.data.posts))
      .catch(console.error);
  }, []);

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleUpdate = async () => {
    try {
      await updatePost(selectedPost._id, { title, content });
      navigate(`/posts/${selectedPost._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(selectedPost._id);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <SearchBar setPosts={setPosts} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-4 border rounded"
            onClick={() => handleSelectPost(post)}
          >
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{parse(post.content.substring(0, 100))}...</p>
          </div>
        ))}
      </div>
      {selectedPost && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Edit Selected Post</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Content</label>
              <QuillEditor value={content} onChange={setContent} />
            </div>
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Update Post
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded ml-2"
            >
              Delete Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditPost;
