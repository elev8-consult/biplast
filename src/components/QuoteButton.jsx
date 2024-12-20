import React from "react";
import { useQuote } from "../context/QuoteContext";

const QuoteButton = ({ onClick }) => {
  const { quoteItems } = useQuote();

  const totalItems = quoteItems.reduce((sum, item) => sum + item.quantity, 0);

  if (quoteItems.length === 0) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="fixed top-20 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <span>{totalItems}</span>
    </button>
  );
};

export default QuoteButton;
