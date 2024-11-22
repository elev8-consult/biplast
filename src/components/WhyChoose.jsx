import React from "react";

const WhyChoose = () => {
  const features = [
    {
      icon: `${window.themeDirectory}/assets/services1.png`,
      description:
        "We understand the importance of timely service, which is why we offer next-day delivery on most of our products, ensuring you meet your deadlines.",
    },
    {
      icon: `${window.themeDirectory}/assets/services2.png`,
      description:
        "Our products are made from high-grade, BPA-free plastics, ensuring both durability and safety.",
    },
    {
      icon: `${window.themeDirectory}/assets/services3.png`,
      description:
        "At BIPLAST, we are committed to reducing our environmental impact by offering recyclable and eco-friendly plastic options.",
    },
    {
      icon: `${window.themeDirectory}/assets/services4.png`,
      description:
        "Whether you need one bottle or a thousand, we've got you covered. Our flexible ordering options are designed to support businesses of all sizes.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-8 md:mb-12 text-center md:text-start font-poppins font-bold">
        Why Choose BIPLAST?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md flex flex-col md:flex-row"
          >
            <div className="w-full md:w-1/2 p-4 md:p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-secondary">
              <img
                src={feature.icon}
                alt=""
                className="text-blue-600 w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
              />
            </div>
            <div className="w-full md:w-1/2 p-4 md:p-6 flex items-center">
              <p className="text-gray-600 text-base md:text-lg font-poppins font-medium text-center md:text-left">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
