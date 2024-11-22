import React from "react";

const Items = () => {
  const image1 = `${window.themeDirectory}/assets/image1.png`;
  const image2 = `${window.themeDirectory}/assets/image2.png`;
  const image3 = `${window.themeDirectory}/assets/image3.png`;
  const image4 = `${window.themeDirectory}/assets/image4.png`;
  const image5 = `${window.themeDirectory}/assets/image5.png`;
  const rightarrow = `${window.themeDirectory}/assets/rightarrow.png`;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="w-full h-full my-10">
        <div className="max-w-xl h-full mb-8">
          <h1 className="text-primary text-4xl md:text-7xl font-poppins font-bold mb-6">
            Meet Your Packaging
          </h1>
          <p className="text-primary text-base font-poppins font-medium text-start mb-5">
            We have a robust stock catalog to suit your needs, and the ability
            to quick-turn nearly any plastic bottle.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -top-12 right-0 flex items-center justify-center gap-5">
            <span className="text-sm md:text-base font-poppins font-medium">
              View All
            </span>
            <img src={rightarrow} alt="" className="h-4 object-fit" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full h-full gap-3">
            {[image1, image2, image3, image4, image5].map((image, index) => (
              <div
                key={index}
                className="w-full h-full flex items-center justify-center bg-tertiery hover:shadow-md hover:scale-105 focus:shadow-md focus:scale-105 rounded-lg transition-all duration-300 p-10"
              >
                <img src={image} alt="" className=" object-fit" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Items;
