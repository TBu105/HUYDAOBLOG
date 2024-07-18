import React, { useState } from "react";
import { searchPosts } from "../api/postApi";

const SearchBar = ({ setPosts }) => {
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await searchPosts(search);
      setPosts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts..."
        className="w-full p-2 border rounded mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
