import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container min-h-screen mx-auto px-4 py-16 text-center flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">
        Sorry, the page you are looking for doesn't exist.
      </p>
      <a
        href="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Go back to homepage
      </a>
    </div>
  );
};

export default NotFound;
