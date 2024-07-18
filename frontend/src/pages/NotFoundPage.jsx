// components/NotFound.js
import React from "react";

const NotFound = () => {
  return (
    <div className="container p-4 flex justify-center items-center h-[500px]">
      <div className="">
        <h1 className="text-4xl font-bold text-center">404 - Not Found</h1>
        <p className="text-center mt-4">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
