import React from "react";

const About = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="container max-w-7xl my-12 md:my-20 flex flex-col md:flex-row w-full h-full items-start justify-between gap-8 ">
        <h1 className="text-primary text-4xl md:text-7xl font-poppins font-bold mb-6 md:mb-0">
          About.
        </h1>
        <div className="flex items-start justify-center flex-col max-w-xl">
          <h2 className="text-primary text-xl mb-5 font-poppins font-semibold">
            Plastic Injection and <br /> Mold Leader
          </h2>
          <p className="text-primary text-base text-start mb-5 font-poppins font-medium">
            BI-PLAST has been specialized in supplying the products from the
            mold design to plastic injection and mold making since it's
            established in the beginning of the 90's. After over 15 years of
            professional design & manufacturing, we've explored and summarized
            abundant successful experience of making blow and injection plastic.
          </p>
          <a
            href=""
            className="py-3 px-5 border-2 border-primary text-base hover:bg-primary hover:text-white transition-colors font-poppins font-semibold"
          >
            Read more
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
