import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/postApi";
import LoadingPage from "./LoadingPage";
import LazyLoad from "react-lazyload";
import parse from "html-react-parser";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(id)
      .then((response) => setPost(response.data))
      .catch(console.error);
  }, [id]);

  if (!post) return <LoadingPage />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-5">{post.title}</h1>
      <img
        src={post.photo}
        alt={post.title}
        className="my-4 object-fit w-auto h-[500px] mx-auto"
      />
      <LazyLoad offset={100}>
        <p>{parse(post.content)}</p>
      </LazyLoad>
    </div>
  );
};

export default PostDetail;
