import React from "react";

const Heroes = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="w-full h-full flex flex-col items-center justify-center relative py-12 md:mt-28">
        <h1 className="text-4xl sm:text-6xl md:text-7xl text-primary font-poppins font-bold mb-5 text-center">
          About Us
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary font-poppins font-semibold mb-8 text-center">
          Plastic Injection and Mold Leader
        </h2>
        <p className="text-base sm:text-lg text-secondary font-poppins font-normal max-w-2xl text-center">
          BI-PLAST has been specialized in supplying products from mold design
          to plastic injection and mold making since the early 90s. After over
          15 years of professional design & manufacturing, we've explored and
          summarized abundant successful experience of making blow and injection
          plastic.
        </p>
      </div>
    </section>
  );
};

export default Heroes;
