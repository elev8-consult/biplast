import React, { createContext, useContext, useState, useEffect } from "react";

const QuoteContext = createContext();

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return context;
};

export const QuoteProvider = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState(() => {
    const savedItems = localStorage.getItem("quoteItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    // Sync localStorage whenever quoteItems changes
    localStorage.setItem("quoteItems", JSON.stringify(quoteItems));
  }, [quoteItems]);

  useEffect(() => {
    // Clear localStorage and reset state on page refresh
    const handleBeforeUnload = () => {
      localStorage.removeItem("quoteItems");
      setQuoteItems([]);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const addToQuote = (item) => {
    setQuoteItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [
        ...prevItems,
        {
          ...item,
          image: item.image || "/placeholder.svg?height=64&width=64",
          volume: item.volume || "N/A",
          shape: item.shape || "N/A",
          reference_id: item.reference_id || "N/A",
          material: item.material || "N/A",
        },
      ];
    });
  };

  const removeFromQuote = (id) => {
    setQuoteItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setQuoteItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const updateItemDetails = (id, details) => {
    setQuoteItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, ...details } : item))
    );
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  return (
    <QuoteContext.Provider
      value={{
        quoteItems,
        addToQuote,
        removeFromQuote,
        updateQuantity,
        updateItemDetails,
        clearQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};
