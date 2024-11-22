import React, { useState, useEffect, useCallback } from "react";
import { ChevronDown, Search, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [neckConnections, setNeckConnections] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [marketSegments, setMarketSegments] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    material: "all",
    neckConnection: "all",
    shape: "all",
    marketSegment: "all",
    minVolume: "",
    maxVolume: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const heroUrl = `${window.themeDirectory}/assets/heroServices.png`;

  useEffect(() => {
    const fetchProductsAndTaxonomies = async () => {
      try {
        const [productsResponse, ...taxonomyResponses] = await Promise.all([
          fetch("/wp-json/wp/v2/products?_embed&per_page=100"),
          fetch("/wp-json/wp/v2/product_category?per_page=100"),
          fetch("/wp-json/wp/v2/product_material?per_page=100"),
          fetch("/wp-json/wp/v2/product_neck_connection?per_page=100"),
          fetch("/wp-json/wp/v2/product_shape?per_page=100"),
          fetch("/wp-json/wp/v2/product_market_segment?per_page=100"),
        ]);

        if (!productsResponse.ok) {
          throw new Error(`HTTP error! status: ${productsResponse.status}`);
        }

        const productsData = await productsResponse.json();
        setProducts(productsData);

        console.log(productsData);

        const taxonomyData = await Promise.all(
          taxonomyResponses.map((response) => response.json())
        );

        setCategories(["All", ...taxonomyData[0].map((cat) => cat.name)]);
        setMaterials(["All", ...taxonomyData[1].map((mat) => mat.name)]);
        setNeckConnections([
          "All",
          ...taxonomyData[2].map((neck) => neck.name),
        ]);
        setShapes(["All", ...taxonomyData[3].map((shape) => shape.name)]);
        setMarketSegments([
          "All",
          ...taxonomyData[4].map((segment) => segment.name),
        ]);

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductsAndTaxonomies();
  }, []);

  const getFeaturedImageUrl = (product) => {
    if (
      product._embedded &&
      product._embedded["wp:featuredmedia"] &&
      product._embedded["wp:featuredmedia"][0] &&
      product._embedded["wp:featuredmedia"][0].source_url
    ) {
      return product._embedded["wp:featuredmedia"][0].source_url;
    }
    return null;
  };

  const matchesTaxonomy = (product, taxonomy, filterValue) => {
    if (!product[taxonomy] || !Array.isArray(product[taxonomy])) {
      return false;
    }
    const taxonomyTerms =
      product._embedded && product._embedded["wp:term"]
        ? product._embedded["wp:term"].find(
            (terms) => terms[0] && terms[0].taxonomy === taxonomy
          )
        : [];
    return taxonomyTerms.some(
      (term) => term.name.toLowerCase() === filterValue.toLowerCase()
    );
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        filters.category === "all" ||
        matchesTaxonomy(product, "product_category", filters.category);

      const matchesMaterial =
        filters.material === "all" ||
        matchesTaxonomy(product, "product_material", filters.material);

      const matchesNeckConnection =
        filters.neckConnection === "all" ||
        matchesTaxonomy(
          product,
          "product_neck_connection",
          filters.neckConnection
        );

      const matchesShape =
        filters.shape === "all" ||
        matchesTaxonomy(product, "product_shape", filters.shape);

      const matchesMarketSegment =
        filters.marketSegment === "all" ||
        matchesTaxonomy(
          product,
          "product_market_segment",
          filters.marketSegment
        );

      const matchesVolume =
        (filters.minVolume === "" ||
          parseFloat(product.product_details?.volume || 0) >=
            parseFloat(filters.minVolume)) &&
        (filters.maxVolume === "" ||
          parseFloat(product.product_details?.volume || 0) <=
            parseFloat(filters.maxVolume));

      const matchesSearch = (product.title?.rendered || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return (
        matchesCategory &&
        matchesMaterial &&
        matchesNeckConnection &&
        matchesShape &&
        matchesMarketSegment &&
        matchesVolume &&
        matchesSearch
      );
    })
    .sort((a, b) => {
      if (sortBy === "price") {
        return (
          parseFloat(a.product_details?.price || 0) -
          parseFloat(b.product_details?.price || 0)
        );
      } else if (sortBy === "name") {
        return (a.title?.rendered || "").localeCompare(b.title?.rendered || "");
      }
      return 0;
    });

  const renderProductCard = useCallback((product) => {
    const featuredImageUrl = getFeaturedImageUrl(product);
    return (
      <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
        {featuredImageUrl ? (
          <img
            src={featuredImageUrl}
            alt={product.title?.rendered || "Product image"}
            className="w-full h-48 object-cover mb-4 rounded"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4 rounded">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        <h3 className="font-bold text-lg mb-2">
          {product.title?.rendered || "Untitled Product"}
        </h3>
        <p className="text-blue-600 font-medium mb-2">
          Ref: {product.product_details?.reference_id || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          Volume: {product.product_details?.volume || "N/A"}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Weight: {product.product_details?.weight || "N/A"}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="block w-full text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          View Product
        </Link>
      </div>
    );
  }, []);

  const renderFilter = useCallback(
    (label, options, currentValue, onChange) => (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <select
          value={currentValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {options.map((option) => (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
      </div>
    ),
    []
  );

  if (loading)
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error)
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;

  return (
    <div className="font-sans">
      <section className="w-full h-[300px] mt-20 md:mt-40 relative">
        <img
          src={heroUrl}
          alt="Product hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Our Products
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter button */}
          <button
            className="md:hidden flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4"
            onClick={() => setMobileFiltersOpen(true)}
            aria-label="Open filters"
          >
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </button>

          {/* Filters sidebar */}
          <div
            className={`md:w-1/4 ${
              mobileFiltersOpen
                ? "fixed inset-0 z-40 overflow-y-auto"
                : "hidden md:block"
            }`}
          >
            <div className="bg-white p-4 rounded-lg shadow-md">
              {mobileFiltersOpen && (
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    aria-label="Close filters"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {renderFilter("Category", categories, filters.category, (value) =>
                setFilters({ ...filters, category: value })
              )}
              {renderFilter("Material", materials, filters.material, (value) =>
                setFilters({ ...filters, material: value })
              )}
              {renderFilter(
                "Neck Connection",
                neckConnections,
                filters.neckConnection,
                (value) => setFilters({ ...filters, neckConnection: value })
              )}
              {renderFilter("Shape", shapes, filters.shape, (value) =>
                setFilters({ ...filters, shape: value })
              )}
              {renderFilter(
                "Market Segment",
                marketSegments,
                filters.marketSegment,
                (value) => setFilters({ ...filters, marketSegment: value })
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Volume Range (ml)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minVolume}
                    onChange={(e) =>
                      setFilters({ ...filters, minVolume: e.target.value })
                    }
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxVolume}
                    onChange={(e) =>
                      setFilters({ ...filters, maxVolume: e.target.value })
                    }
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              {renderFilter("Sort By", ["Name", "Price"], sortBy, setSortBy)}
            </div>
          </div>

          {/* Product grid */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(renderProductCard)}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-xl text-gray-600">No products found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
