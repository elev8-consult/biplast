import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
  ];

  const logoURL = `${window.themeDirectory}/assets/logo.png`;
  const mailURL = `${window.themeDirectory}/assets/mail.png`;
  const phoneURL = `${window.themeDirectory}/assets/phone.png`;
  const arrowupURL = `${window.themeDirectory}/assets/arrowUp.png`;

  return (
    <nav className="bg-primary sm:bg-white fixed top-0 left-0 w-full z-50">
      <div className="px-20 bg-primary w-full hidden sm:flex items-center justify-between">
        <div>
          <img src={logoURL} alt="logo" />
        </div>
        <div className="flex items-center justify-between gap-5">
          <Link
            className="w-full cursor-pointer"
            to="mailto:example@example.com"
          >
            <img src={mailURL} alt="email" />
          </Link>
          <Link className="w-full cursor-pointer" href="tel:+000000000">
            <img src={phoneURL} alt="phone" />
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-auto">
          {/* Mobile logo */}
          <div className="flex items-center md:hidden">
            <img src={logoURL} alt="logo" className="h-8 w-auto" />
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block flex-grow">
            <div className="ml-10 flex items-baseline space-x-4 py-5 justify-end">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-secondary hover:text-black px-3 py-2 rounded-md text-base font-poppins font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/quote"
                className="bg-bgBlue hover:bg-bgBlue2 rounded-full px-5 py-3 shadow-md flex items-center justify-between gap-5 font-poppins font-medium"
              >
                <span className="text-base text-white">Enquire</span>
                <img
                  src={arrowupURL}
                  alt="arrow-up"
                  className="w-4 object-fit"
                />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="text-white hover:bg-primary-dark hover:text-white block px-3 py-2 rounded-md text-base font-poppins font-medium"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#"
              className="bg-bgBlue hover:bg-bgBlue2 rounded-full px-5 py-3 shadow-md flex items-center justify-between gap-5 mt-4 font-poppins font-medium"
            >
              <span className="text-base text-white">Enquire</span>
              <img src={arrowupURL} alt="arrow-up" className="w-3" />
            </a>
          </div>
        </div>
      )}

      <div className="w-full text-center p-4 mx-auto bg-tertiery">
        <p className="text-sm text-secondary font-poppins font-medium">
          The leading innovators in plastic manufacturing, delivering unmatched
          quality, precision, and sustainable solutions that drive industries
          forward.
        </p>
      </div>
    </nav>
  );
}
