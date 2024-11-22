import React from "react";

const OurProducts = () => {
  const products = [
    {
      icon: `${window.themeDirectory}/assets/products1.png`,
      title: "PET Bottles",
      description:
        "Ideal for packaging beverages, chemicals, or personal care products, our PET bottles are available in a variety of sizes, including our popular 750cc option. They are lightweight, durable, and customizable with your branding.",
    },
    {
      icon: `${window.themeDirectory}/assets/products2.png`,
      title: "Gallons",
      description:
        "For larger quantities, our plastic gallons are the perfect choice. Strong, reusable, and easy to transport, they offer a reliable solution for storing liquids or chemicals.",
    },
    {
      icon: `${window.themeDirectory}/assets/products3.png`,
      title: "Custom Plastic Solutions",
      description:
        "Need a unique design or specific dimensions? Our team can work with you to create custom plastic products tailored to your needs. From prototypes to mass production, we ensure your vision becomes a reality.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-800 font-poppins font-bold mb-8 md:mb-12 text-center md:text-start">
        Our Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {products.slice(0, 2).map((product, index) => (
          <div
            key={index}
            className="bg-white p-4 md:p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start"
          >
            <img
              src={product.icon}
              alt=""
              className="h-20 md:h-28 mb-4 md:mb-0 md:mr-6 flex-shrink-0"
            />
            <div className="text-center md:text-left">
              <h2 className="text-lg md:text-xl font-poppins font-semibold text-blue-600 mb-2">
                {product.title}
              </h2>
              <p className="text-sm md:text-base text-gray-600 font-poppins font-medium">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 md:mt-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start">
          <img
            src={products[2].icon}
            alt=""
            className="h-20 md:h-28 mb-4 md:mb-0 md:mr-6 flex-shrink-0"
          />
          <div className="text-center md:text-left">
            <h2 className="text-lg md:text-xl font-poppins font-semibold text-blue-600 mb-2">
              {products[2].title}
            </h2>
            <p className="text-sm md:text-base text-gray-600 font-poppins font-medium">
              {products[2].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
