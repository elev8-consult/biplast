import React from "react";

const Footer = () => {
  const facebookUrl = `${window.themeDirectory}/assets/facebook.png`;
  const twitterUrl = `${window.themeDirectory}/assets/twitter.png`;
  const linkedinUrl = `${window.themeDirectory}/assets/linkedin.png`;

  return (
    <footer className="w-full h-full  bg-white">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-tertiery flex flex-col items-center justify-center py-10">
          <h1 className="text-2xl text-primary font-poppins font-bold text-center mb-5">
            ABOUT US
          </h1>
          <ul className="flex flex-col items-center font-poppins font-normal justify-center gap-3 mb-10">
            <li>Adosdsd</li>
            <li>Organization</li>
            <li>Archetictureermesd</li>
            <li>Summary</li>
            <li>Iundfhetohssvkssaj</li>
          </ul>
          <span className="font-poppins font-medium">© BI-PLAST</span>
        </div>
        <div className="bg-white flex flex-col items-center justify-center py-10">
          <h1 className="text-2xl text-primary font-poppins font-bold text-center mb-5">
            PRODUCTS
          </h1>
          <ul className="flex flex-col items-center font-poppins font-normal justify-center gap-3 mb-10">
            <li>Adosdsd</li>
            <li>Organization</li>
            <li>Archetictureermesd</li>
            <li>Summary</li>
            <li>Iundfhetohssvkssaj</li>
          </ul>
          <div className="flex items-center justify-between gap-10">
            <a href="">
              <img src={facebookUrl} alt="" />
            </a>
            <a href="">
              <img src={twitterUrl} alt="" />
            </a>
            <a href="">
              <img src={linkedinUrl} alt="" />
            </a>
          </div>
        </div>
        <div className="bg-tertiery flex flex-col items-center justify-center">
          <h1 className="text-2xl text-primary font-poppins font-bold text-center mb-5">
            SERVICES
          </h1>
          <ul className="flex flex-col items-center font-poppins font-normal justify-center gap-3 mb-10">
            <li>Adosdsd</li>
            <li>Organization</li>
            <li>Archetictureermesd</li>
            <li>Summary</li>
            <li>Iundfhetohssvkssaj</li>
          </ul>
          <span className="font-poppins font-medium">2024</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
