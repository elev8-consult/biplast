import React, { useState } from "react";

const OurPromise = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <>
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl text-primary font-poppins font-bold mb-6 md:mb-8 text-center md:text-left">
            Our Promise
          </h2>
          <div className="border-2 border-tertiery rounded-lg p-4 md:p-10">
            <p className="text-blue-600 text-base md:text-lg text-center md:text-left font-poppins font-medium">
              At BIPLAST, customer satisfaction is at the heart of everything we
              do. From product development to delivery, we strive for excellence
              in every step of the process. Our dedication to quality,
              reliability, and flexibility makes us the go-to partner for
              businesses looking for high-quality plastic products.
            </p>
          </div>
        </div>

        <div className="mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl text-primary font-poppins font-bold mb-4 text-center md:text-left">
            Ready to Get Started?
          </h2>
          <p className="text-base md:text-lg text-black text-center md:text-left font-poppins font-medium">
            Explore our range of products and experience the BIPLAST difference
            today. Whether you're looking for a single bottle or a bulk order,
            we've got the perfect solution for you.
          </p>
        </div>
      </section>

      <div className="bg-blue-400 rounded-lg text-white mb-8 md:mb-10 px-4 md:px-28 py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-poppins font-bold mb-4 md:mb-6 text-center">
          Sign up for Exclusive Offers
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-2 rounded-t-lg sm:rounded-l-lg sm:rounded-t-none text-gray-800 mb-2 sm:mb-0 font-poppins font-normal"
            required
          />
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-b-lg sm:rounded-r-lg sm:rounded-b-none transition duration-300 font-poppins"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default OurPromise;
