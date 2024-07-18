import axios from "axios";

const BASE_URL = "http://localhost:3045/api/v1";

export const createPost = async (data) => axios.post(`${BASE_URL}/posts`, data);

export const updatePost = async (id, data) =>
  axios.put(`${BASE_URL}/posts/${id}`, data);

export const deletePost = async (id) => axios.delete(`${BASE_URL}/posts/${id}`);

export const getPost = async (id) => axios.get(`${BASE_URL}/posts/${id}`);

export const getPosts = async (pageNumber) =>
  axios.get(`${BASE_URL}/posts/list/${pageNumber}`);

export const searchPosts = async (keywords) =>
  axios.get(`${BASE_URL}/posts/search/${keywords}`);

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await axios.post(CLOUDINARY_URL, formData);
  return response.data.secure_url;
};

