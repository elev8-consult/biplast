import React from "react";

const Lab = () => {
  const labURL = `${window.themeDirectory}/assets/lab.png`;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-7xl h-full mb-20">
        <h1 className="text-primary text-4xl md:text-7xl font-poppins font-bold mb-10 max-w-5xl leading-snug">
          COMPLETE LAB TESTING FACILITIES
        </h1>
        <img
          src={labURL}
          alt="lab-image"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="max-w-6xl h-full mt-12 md:mt-36 mx-auto flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full h-full">
            <div className="bg-tertiery p-6 md:p-10 rounded-lg w-full md:max-w-xl">
              <h1 className="text-primary text-2xl md:text-4xl font-poppins font-bold mb-6">
                Expert Material Selection
              </h1>
              <p className="font-poppins font-medium">
                We excel in choosing the perfect plastic material for each
                project, ensuring the highest quality, durability, and
                performance tailored to your specific needs.
              </p>
            </div>
            <div className="bg-tertiery p-6 md:p-10 rounded-lg w-full md:max-w-xl">
              <h1 className="text-primary text-2xl md:text-4xl font-poppins font-bold mb-6">
                State-of-the-Art
              </h1>
              <p className="font-poppins font-medium">
                Our advanced manufacturing techniques, including injection
                molding and extrusion, guarantee efficient production,
                precision, and cost-effectiveness, no matter the complexity of
                your design.
              </p>
            </div>
          </div>
          <div className="bg-tertiery p-6 md:p-10 rounded-lg mt-6 w-full">
            <h1 className="text-primary text-2xl md:text-4xl font-poppins font-bold mb-6">
              Commitment to Sustainability
            </h1>
            <p className="font-poppins font-medium">
              We prioritize environmentally friendly practices by incorporating
              recyclable materials, reducing waste, and constantly innovating to
              minimize our environmental impact while maintaining top-tier
              production standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lab;
