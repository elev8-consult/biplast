import React from "react";

const Services = () => {
  const servicesURL = `${window.themeDirectory}/assets/services.png`;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="w-full h-full mt-8 md:mt-28 mb-8 md:mb-28 relative">
        <img
          src={servicesURL}
          alt="services-image"
          className="block mx-auto md:absolute md:right-0 md:-top-14 w-full max-w-[200px] md:max-w-[300px] h-auto object-contain mb-6 md:mb-0"
        />
        <div className="max-w-3xl h-full">
          <h1 className="text-primary text-3xl md:text-7xl mb-4 md:mb-10 font-poppins font-bold">
            Services
          </h1>
          <h2 className="text-xl md:text-2xl font-poppins font-semibold mb-4">
            Plastic Injection and Mold Leader
          </h2>
          <p className="text-primary text-base text-start font-poppins font-medium mb-6 md:mb-10">
            BI-PLAST has been specialized in supplying the products from the
            mold design to plastic injection and mold making since it's
            established in the beginning of the 90's.
            <br className="hidden md:block" /> After over 15 years of
            professional design & manufacturing, we've explored and summarized
            abundant successful experience of making blow and injection plastic.
          </p>
          <a
            href="#"
            className="inline-block w-full md:w-auto text-center py-3 px-5 border-2 border-primary text-base font-poppins font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
