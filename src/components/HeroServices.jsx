import React from "react";

const HeroServices = () => {
  const heroUrl = `${window.themeDirectory}/assets/heroServices.png`;

  return (
    <>
      <section className="w-full h-full mt-20 md:mt-40">
        <img
          src={heroUrl}
          alt="bottles"
          className="w-full h-[200px] md:h-[300px] object-cover"
        />
      </section>
      <section className="container mx-auto px-4">
        <div className="w-full h-full flex flex-col items-start justify-center relative py-8 md:py-12 md:mt-28">
          <h1 className="text-3xl sm:text-5xl md:text-7xl text-bgBlue font-poppins font-bold mb-6 md:mb-10 w-full text-start">
            Services
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-4xl text-primary font-poppins font-semibold mb-6 md:mb-8 w-full text-start">
            Welcome to BIPLAST
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-secondary font-poppins font-normal max-w-2xl w-full text-start mb-3">
            Your Trusted Partner for High-Quality Plastic Products
          </p>
          <p className="text-sm sm:text-base md:text-lg text-black font-poppins font-normal max-w-5xl w-full text-start">
            At BIPLAST, we specialize in providing premium-grade plastic
            products that cater to a wide range of industries. Whether you need
            a single 750cc PET bottle or a bulk order of gallons, we ensure
            top-notch quality and an easy purchasing experience. Our extensive
            product line includes PET bottles, gallons, and custom solutions
            designed to meet your specific needs.
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroServices;
