import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QuoteProvider } from "./context/QuoteContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuoteCard from "./components/QuoteCard";
import QuoteButton from "./components/QuoteButton";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import SingleProduct from "./pages/SingleProduct";
import Quote from "./pages/Quote";

const App = () => {
  const [isQuoteCardVisible, setIsQuoteCardVisible] = useState(true);

  return (
    <QuoteProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow relative">
            <div className="fixed top-20 right-4 z-50">
              {isQuoteCardVisible ? (
                <QuoteCard />
              ) : (
                <QuoteButton onClick={() => setIsQuoteCardVisible(true)} />
              )}
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/product/:productId" element={<SingleProduct />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QuoteProvider>
  );
};

export default App;
