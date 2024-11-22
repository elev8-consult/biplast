import React from "react";
import Hero from "../components/Hero";
import Testimonial from "../components/Testimonial";
import Videos from "../components/Videos";
import About from "../components/About";
import Items from "../components/Items";
import Services from "../components/Services";
import Lab from "../components/Lab";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <About />
      <Videos />
      <Items />
      <Testimonial />
      <Services />
      <Lab />
    </div>
  );
};

export default Home;
