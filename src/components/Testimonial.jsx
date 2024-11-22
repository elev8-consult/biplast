import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Testimonial() {
  const img1URL = `${window.themeDirectory}/assets/testemonial.png`;
  const img2URL = `${window.themeDirectory}/assets/testemonial.png`;
  const img3URL = `${window.themeDirectory}/assets/testemonial.png`;

  const testimonials = [
    {
      id: 1,
      image: img1URL,
      text: "I've been sourcing water bottles for my business from BIPLAST for over two years, and I couldn't be more pleased with their products and service. The quality of their bottles is exceptional - lightweight, durable, and BPA-free, which is exactly what our customers demand.",
      author: "John M, CEO of Pure Hydration",
    },
    {
      id: 2,
      image: img2URL,
      text: "BIPLAST has been our go-to supplier for all our plastic manufacturing needs. Their attention to detail and commitment to sustainability have significantly improved our product line.",
      author: "Sarah L, Product Manager at EcoPackage",
    },
    {
      id: 3,
      image: img3URL,
      text: "The team at BIPLAST consistently delivers high-quality plastic components that meet our exacting standards. Their innovative approach to manufacturing has helped us stay ahead in a competitive market.",
      author: "Michael R, Director of Operations at TechGadgets Inc.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: updateTestimonial,
    });
  }, [currentTestimonial]);

  const updateTestimonial = () => {
    gsap.to(imageRef.current, { opacity: 1, duration: 0.5 });
    gsap.from(textRef.current, { y: 20, opacity: 0, duration: 0.5 });
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="container mx-auto px-4 py-12 relative min-h-screen">
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl leading-tight font-poppins font-bold">
            <span className="text-secondary">The </span>
            <span className="text-primary">Plastics Manufacturing</span>
            <br />
            <span className="text-secondary">company</span>
            <br />
            <span className="bg-primary text-white px-4 py-2 inline-block mt-2">
              you can rely on.
            </span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-8 md:mt-14">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-primary mb-6">
              What Our
              <br />
              Customers
              <br />
              Are Saying
            </h2>
            <div className="space-y-4">
              <button className="w-full md:w-auto bg-primary text-white text-sm px-6 py-2 rounded hover:bg-primary-dark transition-colors font-poppins font-medium">
                VIEW CUSTOMER SUCCESS STORIES
              </button>
              <button className="w-full md:w-auto bg-primary text-white text-sm px-6 py-2 rounded hover:bg-primary-dark transition-colors block font-poppins font-medium">
                VIEW CASE STUDIES
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative mt-8 md:mt-0">
            <img
              ref={imageRef}
              src={testimonials[currentTestimonial].image}
              alt="Testimonial"
              className="w-full md:w-[510px] h-auto md:h-[380px] rounded-lg md:absolute md:bottom-10 md:left-1 md:right-6"
            />
            <div
              ref={textRef}
              className="bg-primary text-white p-6 rounded mt-4 md:mt-0 md:absolute md:-bottom-10 md:left-28 md:right-1"
            >
              <p className="text-sm mb-4 font-poppins font-medium">
                {testimonials[currentTestimonial].text}
              </p>
              <p className="text-xs font-semibold font-poppins">
                - {testimonials[currentTestimonial].author}
              </p>
            </div>
          </div>
          <button
            onClick={handleNext}
            className="mt-8 md:mt-0 md:absolute bottom-0 right-0 text-primary flex items-center"
            aria-label="Next testimonial"
          >
            <span className="text-xs mr-2 font-poppins font-bold">NEXT</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="ml-2">
              <span className="text-2xl font-poppins font-bold">
                {(currentTestimonial + 1).toString().padStart(2, "0")}
              </span>
              <span className="text-xs font-poppins font-medium">
                /{testimonials.length.toString().padStart(2, "0")}
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
