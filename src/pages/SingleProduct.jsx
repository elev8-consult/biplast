import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";

export default function SingleProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToQuote } = useQuote();
  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) {
        setError("Product ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://bi-plast.local/wp-json/wp/v2/products/${productId}?_embed`
        );
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Product not found"
              : `HTTP error! status: ${response.status}`
          );
        }
        const data = await response.json();
        setProduct(data);

        // Fetch image URLs
        const featuredImage =
          data._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        const image1Url = await getImageUrl(data.acf?.image_1);
        const image2Url = await getImageUrl(data.acf?.image_2);

        const allImages = [featuredImage, image1Url, image2Url].filter(Boolean);

        setMainImage(allImages[0] || "/placeholder.svg?height=400&width=400");
        setThumbnails(allImages);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  async function getImageUrl(imageId) {
    if (!imageId) return null;
    if (typeof imageId === "string" && imageId.startsWith("http"))
      return imageId;

    try {
      const response = await fetch(
        `http://bi-plast.local/wp-json/wp/v2/media/${imageId}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.source_url;
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return null;
    }
  }

  const handleAddToQuote = () => {
    if (!product) return;
    addToQuote({
      id: product.id,
      title: product.title.rendered,
      reference_id: product.acf?.reference_id || "N/A",
      quantity: quantity,
      image: mainImage,
      volume: product.acf?.volume || "N/A",
      weight: product.acf?.weight || "N/A",
      shape: product.acf?.shape || "N/A",
      material:
        product._embedded?.["wp:term"]?.find(
          (terms) => terms[0]?.taxonomy === "product_material"
        )?.[0]?.name || "N/A",
    });
  };

  if (loading)
    return (
      <div className="container mx-auto px-4 py-20 text-center">Loading...</div>
    );
  if (error)
    return (
      <div className="container mx-auto px-4 py-22 mt-22 text-center">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Back to Products
        </button>
      </div>
    );
  if (!product)
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        Product not found
      </div>
    );

  const material =
    product._embedded?.["wp:term"]?.find(
      (terms) => terms[0]?.taxonomy === "product_material"
    )?.[0]?.name || "N/A";
  const shape =
    product._embedded?.["wp:term"]?.find(
      (terms) => terms[0]?.taxonomy === "product_shape"
    )?.[0]?.name || "N/A";

  return (
    <div className="container flex flex-col items-center justify-center mt-28 mx-auto px-4 py-20 max-w-6xl">
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </a>
          </li>
          <li className="inline-flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <a href="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </a>
          </li>
          <li className="inline-flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">{product.title.rendered}</span>
          </li>
        </ol>
      </nav>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="product-image flex">
            <div className="thumbnail-container flex flex-col mr-4 space-y-2">
              {thumbnails.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`Product view ${index + 1}`}
                  className="w-20 h-20 object-cover cursor-pointer rounded"
                  onClick={() => setMainImage(thumb)}
                />
              ))}
            </div>
            <div className="main-image-container flex-grow">
              <img
                src={mainImage}
                alt={product.title.rendered}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="product-details">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              {product.title.rendered}
            </h1>
            <div
              dangerouslySetInnerHTML={{ __html: product.content.rendered }}
              className="prose prose-sm mb-6 text-gray-600"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  Product Details
                </h2>
                <p className="mb-1">
                  <span className="font-medium">Reference ID:</span>{" "}
                  {product.acf.reference_id}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Volume:</span>{" "}
                  {product.acf.volume} ltr
                </p>
                <p className="mb-1">
                  <span className="font-medium">Weight:</span>{" "}
                  {product.acf.weight} kg
                </p>
                <p>
                  <span className="font-medium">PCR Possible:</span>{" "}
                  {product.acf.pcr_possible ? "Yes" : "No"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  Additional Information
                </h2>
                <p className="mb-1">
                  <span className="font-medium">Neck Type:</span>{" "}
                  {product.acf.neck_type}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Material:</span> {material}
                </p>
                <p>
                  <span className="font-medium">Shape:</span> {shape}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToQuote}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add to Quote
              </button>
              <Link
                to="/quote"
                className="flex-1 bg-transparent border-2 border-blue-500 hover:border-none hover:bg-blue-700 text-gray-500 hover:text-white font-bold py-3 px-4 rounded transition duration-300 flex items-center justify-center"
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
