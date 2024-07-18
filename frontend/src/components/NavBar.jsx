import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between">
      <Link to="/" className="text-white">
        Home
      </Link>
      <Link to="/create" className="text-white">
        Create Post
      </Link>
      <Link to="/edit" className="text-white">
        Edit Post
      </Link>
    </div>
  </nav>
);

export default Navbar;
