import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const PostCard = ({ post }) => {
  return (
    <div key={post._id} className="p-4 border rounded">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p>{parse(post.content.substring(0, 100))} ...</p>
      <Link to={`/posts/${post._id}`} className="text-blue-500">
        Read More
      </Link>
    </div>
  );
};

export default PostCard;
