import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postApi";
import QuillEditor from "../utils/QuillEditor";

const CreatePostRichText = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("photo", photo);

    try {
      await createPost(formData);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoOnChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={isLoading}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Photo</label>
          <input
            type="file"
            onChange={handlePhotoOnChange}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {preview && (
            <div className="mt-2">
              <img
                src={preview}
                alt="Photo Review"
                className="max-w-full h-auto"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <QuillEditor
            value={content}
            onChange={setContent}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Post"}
        </button>
      </form>
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="ml-2 text-gray-700">
            Creating post, please wait...
          </span>
        </div>
      )}
    </div>
  );
};

export default CreatePostRichText;
