import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef([]);
  const slideInterval = useRef(null);

  const bottle1 = `${window.themeDirectory}/assets/bottle1.png`;
  const bottle2 = `${window.themeDirectory}/assets/bottle2.png`;
  const bottle3 = `${window.themeDirectory}/assets/bottle3.png`;
  const bottle4 = `${window.themeDirectory}/assets/bottle4.png`;
  const candy = `${window.themeDirectory}/assets/candy.png`;

  const slides = [
    {
      title: (
        <>
          Make everything{" "}
          <img
            src={candy}
            alt="candy icon"
            className="h-8 md:h-10 inline-block mx-2"
          />{" "}
          with Plastic.
        </>
      ),
      subtitle: "Lebanon's leading masterbatch.",
      description:
        "Our products at BI-PLAST are renowned for their superior durability, precision engineering, and environmentally conscious design, setting the standard for excellence in the plastic manufacturing industry.",
      cta: "Shop",
    },
    {
      title: "Innovative Plastic Solutions",
      subtitle: "Transforming industries with cutting-edge technology",
      description:
        "BI-PLAST leads the way in developing sustainable and high-performance plastic solutions that meet the evolving needs of various industries.",
      cta: "Explore Solutions",
    },
    {
      title: "Quality You Can Trust",
      subtitle: "Precision-engineered plastic products",
      description:
        "With state-of-the-art manufacturing processes and rigorous quality control, BI-PLAST ensures that every product meets the highest standards of excellence.",
      cta: "Learn More",
    },
  ];

  useEffect(() => {
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    slideInterval.current = setInterval(nextSlide, 5000);

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [slides.length]);

  useEffect(() => {
    slidesRef.current.forEach((slide, index) => {
      if (slide) {
        gsap.to(slide, {
          opacity: index === currentSlide ? 1 : 0,
          zIndex: index === currentSlide ? 1 : 0,
          duration: 0.5,
        });
      }
    });
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="w-full min-h-screen flex items-center justify-center relative py-12 mt-36 overflow-hidden">
        <img
          src={bottle1}
          alt="bottle mockup"
          className="absolute top-0 left-0 w-1/4 md:w-auto max-w-[200px]"
        />
        <img
          src={bottle2}
          alt="bottle mockup"
          className="absolute -top-5 right-0 w-1/4 md:w-auto max-w-[200px]"
        />
        <img
          src={bottle3}
          alt="bottle mockup"
          className="absolute bottom-0 left-1/3 w-1/4 md:w-auto max-w-[200px]"
        />
        <img
          src={bottle4}
          alt="bottle mockup"
          className="absolute bottom-0 right-0 w-1/4 md:w-auto max-w-[200px]"
        />
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => (slidesRef.current[index] = el)}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0"
          >
            <h1 className="text-2xl md:text-4xl mb-3 font-poppins font-bold">
              {slide.title}
            </h1>
            <h2 className="text-xl md:text-3xl font-poppins font-bold mb-5">
              {slide.subtitle}
            </h2>
            <p className="text-sm text-secondary w-full font-poppins font-medium md:w-2/3 lg:w-1/3 text-center mt-5">
              {slide.description}
            </p>
            <a
              href="#"
              className="px-12 py-4 bg-primary mt-10 text-base font-poppins font-semibold text-white hover:bg-primary-dark transition-colors"
            >
              {slide.cta}
            </a>
          </div>
        ))}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
          aria-label="Previous slide"
        >
          &#8592;
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
          aria-label="Next slide"
        >
          &#8594;
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
