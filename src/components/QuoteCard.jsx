import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";

const QuoteCard = () => {
  const { quoteItems } = useQuote();
  const [isVisible, setIsVisible] = useState(true);

  const totalItems = quoteItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = quoteItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (quoteItems.length > 0) {
      setIsVisible(true);
    }
  }, [quoteItems]);

  if (quoteItems.length === 0 || !isVisible) {
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-64 relative">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Quote</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
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
      </div>
      <p className="mb-2">Items: {totalItems}</p>
      <Link
        to="/quote"
        className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 text-center"
      >
        View Quote
      </Link>
    </div>
  );
};

export default QuoteCard;
