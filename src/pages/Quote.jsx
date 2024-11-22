import React, { useState } from "react";
import { useQuote } from "../context/QuoteContext";
import { Link } from "react-router-dom";

const Quote = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
  });

  const { quoteItems, removeFromQuote, updateQuantity, clearQuote } =
    useQuote();

  const handleRequestQuote = () => {
    setIsQuoteModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitQuoteRequest = async (e) => {
    e.preventDefault();
    try {
      const quoteDetails = quoteItems
        .map(
          (item) =>
            `${item.title.rendered} (Ref: ${item.reference_id}) - Quantity: ${item.quantity}`
        )
        .join("\n");

      const response = await fetch("/wp-json/custom/v1/send-quote-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.companyName,
          email: formData.email,
          quoteDetails: quoteDetails,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      alert("Quote request sent successfully!");
      setIsQuoteModalOpen(false);
      setFormData({ fullName: "", companyName: "", email: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send quote request. Please try again later.");
    }
  };

  const totalQuantity = quoteItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  if (quoteItems.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center mx-auto px-4 py-8 mt-32 max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-4">Your Quote is Empty</h1>
        <p className="mb-4">Add some products to your quote to get started.</p>
        <Link
          to="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto px-4 py-8 mt-16 max-w-6xl min-h-screen">
      <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Product Page
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Link
                to="/products"
                className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2"
              >
                Product Category
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Link
                to="/products"
                className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2"
              >
                Product Name
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 text-gray-500 md:ml-2 font-medium">
                Quote
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Product Reference
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quoteItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 object-cover mr-4"
                      src={item.image || "/placeholder.svg?height=64&width=64"}
                      alt={item.title.rendered}
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {item.title.rendered}
                      </div>
                      <div className="text-sm text-gray-500">
                        Volume: {item.volume}
                      </div>
                      <div className="text-sm text-gray-500">
                        Weight: {item.weight}
                      </div>
                      <div className="text-sm text-gray-500">
                        Material: {item.material}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.reference_id || "Unknown Reference"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="w-16 p-1 border rounded text-center"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => removeFromQuote(item.id)}
                    className="text-red-600 hover:text-red-900 transition duration-300"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 bg-gray-50">
          <p className="text-xl font-bold text-right">
            Total Quantity: {totalQuantity}
          </p>
        </div>
      </div>
      <div className="mt-8 flex justify-between w-full">
        <button
          onClick={clearQuote}
          className="bg-transparent border-blue-500 border-2 hover:bg-blue-700 hover:border-none text-gray-500 hover:text-white font-bold py-2 px-6 rounded transition duration-300"
        >
          Clear Quote
        </button>
        <button
          onClick={handleRequestQuote}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
              clipRule="evenodd"
            />
          </svg>
          Request Quote
        </button>
      </div>

      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Request Quote
            </h2>
            <form onSubmit={handleSubmitQuoteRequest}>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your company name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end items-center mt-6 space-x-10">
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Submit Quote Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quote;
