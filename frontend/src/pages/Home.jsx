import React, { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";
import SearchBar from "../components/SearchBar";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    getPosts(pageNumber)
      .then((response) => {
        setPosts(response.data.posts);
        setTotalPosts(
          Math.ceil(response.data.totalPost / response.data.skipDoc)
        );
      })
      .catch(console.error);
  }, [pageNumber]);

  const handleNextPage = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs Posts</h1>
      <SearchBar setPosts={setPosts} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={pageNumber === 1}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-xl font-bold">{pageNumber}</span>
        <button
          onClick={handleNextPage}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
          disabled={pageNumber === totalPosts}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
